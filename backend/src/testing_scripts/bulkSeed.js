/**
 * bulkSeed.js — Bulk QA Data Seeder
 * Inserts directly via Mongoose models (no HTTP round-trip).
 * Idempotent: skips records that already exist.
 * Run: node backend/src/scripts/bulkSeed.js
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import path from 'path'
import { fileURLToPath } from 'url'

import { Book } from '../models/book.model.js'
import { Student } from '../models/student.model.js'
import { Employee } from '../models/employee.model.js'
import { Transaction } from '../models/transaction.model.js'
import { BookRequest } from '../models/bookRequest.model.js'
import { Order } from '../models/order.model.js'
import { Notification } from '../models/notification.model.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

// ─── helpers ────────────────────────────────────────────────────────────────

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const pick = (arr) => arr[rand(0, arr.length - 1)]
const pickN = (arr, n) => [...arr].sort(() => Math.random() - 0.5).slice(0, n)
const daysAgo = (d) => new Date(Date.now() - d * 86400000)
const daysFromNow = (d) => new Date(Date.now() + d * 86400000)

// ─── static data pools ──────────────────────────────────────────────────────

const firstNames = ['Aarav','Aditya','Akash','Aman','Ananya','Arjun','Arnav','Ayaan','Bhavya','Chetan',
  'Deepak','Dhruv','Divya','Farhan','Gaurav','Harshita','Ishaan','Jatin','Kabir','Kavya',
  'Kritika','Lakshmi','Manav','Mehak','Mihir','Naina','Nikhil','Nisha','Om','Pooja',
  'Pranav','Priya','Rahul','Ravi','Ritika','Rohan','Rohini','Sahil','Sakshi','Sanjay',
  'Sara','Shreya','Shubham','Siddharth','Simran','Sneha','Soham','Sumit','Tanvi','Tushar',
  'Uday','Uma','Varun','Vedant','Vidya','Vikram','Vishal','Yash','Yogesh','Zara',
  'Abhijit','Abhishek','Aditi','Ajay','Alok','Amrita','Ankit','Ankita','Apoorva','Aryan']

const lastNames = ['Sharma','Verma','Singh','Patel','Kumar','Gupta','Joshi','Mehta','Shah','Rao',
  'Nair','Pillai','Iyer','Menon','Chaudhary','Agarwal','Banerjee','Chatterjee','Das','Bose',
  'Reddy','Naidu','Krishnan','Subramaniam','Mishra','Tiwari','Pandey','Shukla','Srivastava','Tripathi',
  'Dubey','Yadav','Saxena','Kapoor','Malhotra','Khanna','Chopra','Bhatia','Arora','Bajaj',
  'Mahajan','Jain','Goel','Goyal','Agarwal','Mathur','Kaur','Gill','Walia','Dhillon']

const depts = ['Computer Science','Electronics','Mechanical','Civil','Chemical','Biotechnology',
  'Mathematics','Physics','Chemistry','Economics','Business Administration','Psychology',
  'English Literature','History','Philosophy','Architecture','Data Science','AI & ML',
  'Electrical Engineering','Information Technology']

const cities = ['Mumbai','Delhi','Bangalore','Chennai','Kolkata','Hyderabad','Pune','Ahmedabad',
  'Jaipur','Lucknow','Surat','Nagpur','Bhopal','Indore','Chandigarh','Patna','Coimbatore',
  'Kochi','Vadodara','Visakhapatnam']

const streets = ['MG Road','Station Road','Gandhi Nagar','Nehru Street','Patel Colony',
  'Subhash Chowk','Tilak Road','Shivaji Nagar','Civil Lines','Model Town',
  'Lajpat Nagar','Rajaji Nagar','Anna Salai','Park Street','Brigade Road']

const BOOKS_DATA = [
  { globalBookId:'gb001', title:'Clean Code', authors:['Robert C. Martin'], category:['Programming','Software Engineering'], total:5, avl:5 },
  { globalBookId:'gb002', title:'The Pragmatic Programmer', authors:['David Thomas','Andrew Hunt'], category:['Programming'], total:4, avl:4 },
  { globalBookId:'gb003', title:'Design Patterns', authors:['Gang of Four'], category:['Programming','Software Engineering'], total:3, avl:3 },
  { globalBookId:'gb004', title:'Introduction to Algorithms', authors:['Thomas H. Cormen'], category:['Computer Science','Algorithms'], total:8, avl:8 },
  { globalBookId:'gb005', title:'The Art of Computer Programming', authors:['Donald E. Knuth'], category:['Computer Science'], total:2, avl:2 },
  { globalBookId:'gb006', title:'Structure and Interpretation of Computer Programs', authors:['Harold Abelson'], category:['Computer Science','Programming'], total:3, avl:3 },
  { globalBookId:'gb007', title:'Operating System Concepts', authors:['Abraham Silberschatz'], category:['Operating Systems','Computer Science'], total:6, avl:6 },
  { globalBookId:'gb008', title:'Computer Networks', authors:['Andrew S. Tanenbaum'], category:['Networking','Computer Science'], total:5, avl:5 },
  { globalBookId:'gb009', title:'Database System Concepts', authors:['Abraham Silberschatz','Henry F. Korth'], category:['Databases','Computer Science'], total:4, avl:4 },
  { globalBookId:'gb010', title:'Artificial Intelligence: A Modern Approach', authors:['Stuart Russell','Peter Norvig'], category:['Artificial Intelligence','Computer Science'], total:7, avl:7 },
  { globalBookId:'gb011', title:'Machine Learning', authors:['Tom M. Mitchell'], category:['Machine Learning','Artificial Intelligence'], total:5, avl:5 },
  { globalBookId:'gb012', title:'Deep Learning', authors:['Ian Goodfellow'], category:['Machine Learning','Deep Learning'], total:4, avl:4 },
  { globalBookId:'gb013', title:'Python Crash Course', authors:['Eric Matthes'], category:['Programming','Python'], total:10, avl:10 },
  { globalBookId:'gb014', title:'Fluent Python', authors:['Luciano Ramalho'], category:['Programming','Python'], total:5, avl:5 },
  { globalBookId:'gb015', title:'JavaScript: The Good Parts', authors:['Douglas Crockford'], category:['Programming','JavaScript'], total:6, avl:6 },
  { globalBookId:'gb016', title:'You Don\'t Know JS', authors:['Kyle Simpson'], category:['Programming','JavaScript'], total:5, avl:5 },
  { globalBookId:'gb017', title:'Learning React', authors:['Alex Banks','Eve Porcello'], category:['Programming','JavaScript','React'], total:4, avl:4 },
  { globalBookId:'gb018', title:'Node.js Design Patterns', authors:['Mario Casciaro'], category:['Programming','JavaScript','Node.js'], total:3, avl:3 },
  { globalBookId:'gb019', title:'The C Programming Language', authors:['Brian W. Kernighan','Dennis M. Ritchie'], category:['Programming','C'], total:5, avl:5 },
  { globalBookId:'gb020', title:'Effective Java', authors:['Joshua Bloch'], category:['Programming','Java'], total:4, avl:4 },
  { globalBookId:'gb021', title:'Head First Java', authors:['Kathy Sierra'], category:['Programming','Java'], total:6, avl:6 },
  { globalBookId:'gb022', title:'Spring Boot in Action', authors:['Craig Walls'], category:['Programming','Java','Spring'], total:3, avl:3 },
  { globalBookId:'gb023', title:'Engineering Mathematics Vol 1', authors:['H.K. Dass'], category:['Mathematics','Engineering'], total:12, avl:12 },
  { globalBookId:'gb024', title:'Higher Engineering Mathematics', authors:['B.S. Grewal'], category:['Mathematics','Engineering'], total:15, avl:15 },
  { globalBookId:'gb025', title:'Discrete Mathematics', authors:['Kenneth H. Rosen'], category:['Mathematics','Computer Science'], total:8, avl:8 },
  { globalBookId:'gb026', title:'Linear Algebra Done Right', authors:['Sheldon Axler'], category:['Mathematics'], total:4, avl:4 },
  { globalBookId:'gb027', title:'Calculus', authors:['James Stewart'], category:['Mathematics'], total:10, avl:10 },
  { globalBookId:'gb028', title:'Probability and Statistics', authors:['Sheldon Ross'], category:['Mathematics','Statistics'], total:7, avl:7 },
  { globalBookId:'gb029', title:'University Physics', authors:['Hugh D. Young'], category:['Physics'], total:8, avl:8 },
  { globalBookId:'gb030', title:'Concepts of Physics Vol 1', authors:['H.C. Verma'], category:['Physics'], total:12, avl:12 },
  { globalBookId:'gb031', title:'Concepts of Physics Vol 2', authors:['H.C. Verma'], category:['Physics'], total:12, avl:12 },
  { globalBookId:'gb032', title:'Organic Chemistry', authors:['Morrison Boyd'], category:['Chemistry'], total:6, avl:6 },
  { globalBookId:'gb033', title:'Physical Chemistry', authors:['P.W. Atkins'], category:['Chemistry'], total:5, avl:5 },
  { globalBookId:'gb034', title:'Inorganic Chemistry', authors:['J.D. Lee'], category:['Chemistry'], total:4, avl:4 },
  { globalBookId:'gb035', title:'Engineering Mechanics', authors:['R.C. Hibbeler'], category:['Mechanical','Engineering'], total:7, avl:7 },
  { globalBookId:'gb036', title:'Strength of Materials', authors:['R.K. Bansal'], category:['Mechanical','Engineering'], total:6, avl:6 },
  { globalBookId:'gb037', title:'Thermodynamics: An Engineering Approach', authors:['Yunus Cengel'], category:['Mechanical','Engineering','Thermodynamics'], total:5, avl:5 },
  { globalBookId:'gb038', title:'Fluid Mechanics', authors:['Frank M. White'], category:['Mechanical','Engineering'], total:5, avl:5 },
  { globalBookId:'gb039', title:'Electrical Circuit Analysis', authors:['Hayt & Kemmerly'], category:['Electrical','Engineering'], total:6, avl:6 },
  { globalBookId:'gb040', title:'Digital Electronics', authors:['Morris Mano'], category:['Electronics','Engineering'], total:7, avl:7 },
  { globalBookId:'gb041', title:'Signals and Systems', authors:['Oppenheim & Schafer'], category:['Electronics','Engineering'], total:4, avl:4 },
  { globalBookId:'gb042', title:'Microprocessors and Microcontrollers', authors:['A.K. Ray'], category:['Electronics','Computer Science'], total:5, avl:5 },
  { globalBookId:'gb043', title:'Principles of Economics', authors:['N. Gregory Mankiw'], category:['Economics'], total:8, avl:8 },
  { globalBookId:'gb044', title:'Microeconomics', authors:['Pindyck & Rubinfeld'], category:['Economics'], total:5, avl:5 },
  { globalBookId:'gb045', title:'Macroeconomics', authors:['Olivier Blanchard'], category:['Economics'], total:4, avl:4 },
  { globalBookId:'gb046', title:'Financial Management', authors:['Prasanna Chandra'], category:['Finance','Business'], total:6, avl:6 },
  { globalBookId:'gb047', title:'Marketing Management', authors:['Philip Kotler'], category:['Marketing','Business'], total:7, avl:7 },
  { globalBookId:'gb048', title:'Organizational Behavior', authors:['Stephen P. Robbins'], category:['Management','Business'], total:5, avl:5 },
  { globalBookId:'gb049', title:'Introduction to Psychology', authors:['James W. Kalat'], category:['Psychology'], total:6, avl:6 },
  { globalBookId:'gb050', title:'Social Psychology', authors:['David Myers'], category:['Psychology'], total:4, avl:4 },
  { globalBookId:'gb051', title:'English Grammar in Use', authors:['Raymond Murphy'], category:['English','Language'], total:10, avl:10 },
  { globalBookId:'gb052', title:'The Elements of Style', authors:['Strunk & White'], category:['English','Writing'], total:8, avl:8 },
  { globalBookId:'gb053', title:'A History of India', authors:['Romila Thapar'], category:['History'], total:5, avl:5 },
  { globalBookId:'gb054', title:'Modern World History', authors:['Norman Lowe'], category:['History'], total:4, avl:4 },
  { globalBookId:'gb055', title:'Civil Engineering Handbook', authors:['Chen & Liew'], category:['Civil','Engineering'], total:5, avl:5 },
  { globalBookId:'gb056', title:'Geotechnical Engineering', authors:['Braja M. Das'], category:['Civil','Engineering'], total:4, avl:4 },
  { globalBookId:'gb057', title:'Data Structures and Algorithms in Python', authors:['Michael T. Goodrich'], category:['Programming','Algorithms','Python'], total:6, avl:6 },
  { globalBookId:'gb058', title:'Computer Organization and Architecture', authors:['William Stallings'], category:['Computer Science','Architecture'], total:5, avl:5 },
  { globalBookId:'gb059', title:'Software Engineering', authors:['Ian Sommerville'], category:['Software Engineering'], total:6, avl:6 },
  { globalBookId:'gb060', title:'Compiler Design', authors:['Alfred V. Aho'], category:['Computer Science','Compilers'], total:4, avl:4 },

  // Edge-case books: zero availability (needed for Book Request flow)
  { globalBookId:'gb061', title:'The Mythical Man Month', authors:['Frederick P. Brooks Jr.'], category:['Software Engineering','Management'], total:3, avl:0 },
  { globalBookId:'gb062', title:'Refactoring', authors:['Martin Fowler'], category:['Programming','Software Engineering'], total:2, avl:0 },
  { globalBookId:'gb063', title:'Domain-Driven Design', authors:['Eric Evans'], category:['Software Engineering','Architecture'], total:2, avl:0 },
  { globalBookId:'gb064', title:'Release It!', authors:['Michael T. Nygard'], category:['Software Engineering'], total:1, avl:0 },

  // Edge-case: exactly 1 copy available
  { globalBookId:'gb065', title:'Grokking Algorithms', authors:['Aditya Y. Bhargava'], category:['Algorithms','Programming'], total:1, avl:1 },

  // High copy count books
  { globalBookId:'gb066', title:'Engineering Physics', authors:['M.N. Avadhanulu'], category:['Physics','Engineering'], total:25, avl:25 },
  { globalBookId:'gb067', title:'Basic Electrical Engineering', authors:['C.L. Wadhwa'], category:['Electrical','Engineering'], total:20, avl:20 },
  { globalBookId:'gb068', title:'Engineering Drawing', authors:['N.D. Bhatt'], category:['Engineering'], total:18, avl:18 },
  { globalBookId:'gb069', title:'Workshop Technology', authors:['W.A.J. Chapman'], category:['Mechanical','Engineering'], total:15, avl:15 },
  { globalBookId:'gb070', title:'Applied Thermodynamics', authors:['Nag'], category:['Mechanical','Engineering'], total:14, avl:14 },

  // More books to pad to ~100+ variety
  { globalBookId:'gb071', title:'Graph Theory', authors:['Narsingh Deo'], category:['Mathematics','Computer Science'], total:5, avl:5 },
  { globalBookId:'gb072', title:'Numerical Methods', authors:['S.S. Sastry'], category:['Mathematics','Engineering'], total:7, avl:7 },
  { globalBookId:'gb073', title:'Digital Image Processing', authors:['Gonzalez & Woods'], category:['Computer Science','Image Processing'], total:4, avl:4 },
  { globalBookId:'gb074', title:'Computer Vision', authors:['Szeliski'], category:['Computer Science','AI'], total:3, avl:3 },
  { globalBookId:'gb075', title:'Natural Language Processing', authors:['Jurafsky & Martin'], category:['Computer Science','AI','NLP'], total:4, avl:4 },
  { globalBookId:'gb076', title:'Reinforcement Learning', authors:['Sutton & Barto'], category:['Machine Learning','AI'], total:3, avl:3 },
  { globalBookId:'gb077', title:'Data Science from Scratch', authors:['Joel Grus'], category:['Data Science','Programming'], total:5, avl:5 },
  { globalBookId:'gb078', title:'Hands-On Machine Learning', authors:['Aurélien Géron'], category:['Machine Learning','Programming'], total:6, avl:6 },
  { globalBookId:'gb079', title:'Pattern Recognition', authors:['Christopher Bishop'], category:['Machine Learning','AI'], total:3, avl:3 },
  { globalBookId:'gb080', title:'Information Theory', authors:['Thomas M. Cover'], category:['Mathematics','Computer Science'], total:3, avl:3 },
  { globalBookId:'gb081', title:'Cryptography and Network Security', authors:['William Stallings'], category:['Security','Computer Science'], total:5, avl:5 },
  { globalBookId:'gb082', title:'Ethical Hacking', authors:['C. Engebretson'], category:['Security','Computer Science'], total:4, avl:4 },
  { globalBookId:'gb083', title:'Cloud Computing', authors:['Thomas Erl'], category:['Cloud','Computer Science'], total:4, avl:4 },
  { globalBookId:'gb084', title:'Distributed Systems', authors:['van Steen & Tanenbaum'], category:['Computer Science','Distributed Systems'], total:4, avl:4 },
  { globalBookId:'gb085', title:'Microservices Patterns', authors:['Chris Richardson'], category:['Software Engineering','Architecture'], total:4, avl:4 },
  { globalBookId:'gb086', title:'The Phoenix Project', authors:['Gene Kim'], category:['Management','DevOps'], total:5, avl:5 },
  { globalBookId:'gb087', title:'Site Reliability Engineering', authors:['Beyer et al.'], category:['DevOps','Engineering'], total:3, avl:3 },
  { globalBookId:'gb088', title:'Docker Deep Dive', authors:['Nigel Poulton'], category:['DevOps','Programming'], total:5, avl:5 },
  { globalBookId:'gb089', title:'Kubernetes in Action', authors:['Marko Luksa'], category:['DevOps','Cloud'], total:4, avl:4 },
  { globalBookId:'gb090', title:'PostgreSQL: Up and Running', authors:['Regina Obe'], category:['Databases','Programming'], total:3, avl:3 },
  { globalBookId:'gb091', title:'MongoDB: The Definitive Guide', authors:['Shannon Bradshaw'], category:['Databases','NoSQL'], total:4, avl:4 },
  { globalBookId:'gb092', title:'Redis in Action', authors:['Josiah L. Carlson'], category:['Databases','Cache'], total:3, avl:3 },
  { globalBookId:'gb093', title:'System Design Interview', authors:['Alex Xu'], category:['Software Engineering','Architecture'], total:7, avl:7 },
  { globalBookId:'gb094', title:'Cracking the Coding Interview', authors:['Gayle Laakmann McDowell'], category:['Programming','Algorithms'], total:10, avl:10 },
  { globalBookId:'gb095', title:'The Lean Startup', authors:['Eric Ries'], category:['Business','Management'], total:5, avl:5 },
  { globalBookId:'gb096', title:'Zero to One', authors:['Peter Thiel'], category:['Business','Entrepreneurship'], total:4, avl:4 },
  { globalBookId:'gb097', title:'Thinking, Fast and Slow', authors:['Daniel Kahneman'], category:['Psychology','Economics'], total:6, avl:6 },
  { globalBookId:'gb098', title:'Sapiens', authors:['Yuval Noah Harari'], category:['History','Anthropology'], total:7, avl:7 },
  { globalBookId:'gb099', title:'Atomic Habits', authors:['James Clear'], category:['Self-Help','Psychology'], total:8, avl:8 },
  { globalBookId:'gb100', title:'Deep Work', authors:['Cal Newport'], category:['Self-Help','Productivity'], total:6, avl:6 },

  // Long title + unicode edge case
  { globalBookId:'gb101', title:'Introduction to Quantum Mechanics: With Applications to Chemistry (प्रवेश)', authors:['Linus Pauling','E. Bright Wilson'], category:['Physics','Chemistry'], total:3, avl:3 },
  { globalBookId:'gb102', title:'Cours d\'Analyse de l\'École Royale Polytechnique — Premier Partie', authors:['Augustin-Louis Cauchy'], category:['Mathematics'], total:2, avl:2 },

  // Book with zero requests/borrows ever (empty-state)
  { globalBookId:'gb103', title:'Rare Manuscripts in Medieval Sanskrit Literature', authors:['Vishwanath Kashinath Rajwade'], category:['History','Literature'], total:1, avl:1 },
]

// ─── Phase 1 — BOOKS ────────────────────────────────────────────────────────

async function seedBooks() {
  console.log('\n📚 Seeding books...')
  let added = 0
  for (const b of BOOKS_DATA) {
    const exists = await Book.findOne({ globalBookId: b.globalBookId })
    if (!exists) {
      await Book.create(b)
      added++
    }
  }
  console.log(`   ✅ Books: ${added} added (${BOOKS_DATA.length - added} already existed)`)
  return await Book.find({})
}

// ─── Phase 1 — EMPLOYEES ────────────────────────────────────────────────────

async function seedEmployees() {
  console.log('\n👔 Seeding employees...')
  const employees = []
  for (let i = 2; i <= 31; i++) {
    const first = pick(firstNames)
    const last = pick(lastNames)
    employees.push({
      name: `${first} ${last}`,
      empId: i,
      email: `emp${i.toString().padStart(3, '0')}@library.edu`,
      password: 'password123'
    })
  }

  let added = 0
  for (const e of employees) {
    const exists = await Employee.findOne({ empId: e.empId })
    if (!exists) {
      await Employee.create(e)
      added++
    }
  }
  console.log(`   ✅ Employees: ${added} added`)
  return await Employee.find({})
}

// ─── Phase 1 — STUDENTS ─────────────────────────────────────────────────────

async function seedStudents() {
  console.log('\n🎓 Seeding students...')

  let added = 0

  const makeStudentData = (rollNo, opts = {}) => {
    const first = pick(firstNames)
    const last = pick(lastNames)
    const city = pick(cities)
    const year = rand(1995, 2004)
    const month = rand(1, 12)
    const day = rand(1, 28)
    return {
      name: `${first} ${last}`,
      dob: new Date(year, month - 1, day),
      addr: `${rand(1, 999)}, ${pick(streets)}, ${city} - ${rand(100000, 999999)}`,
      email: `student${rollNo}@college.edu`,
      govtId: `https://res.cloudinary.com/demo/image/upload/sample.jpg`,
      dept: pick(depts),
      rollNo,
      password: 'password123',
      status: opts.status || 'Approved',
      cardNo: opts.status === 'Pending' ? undefined : rand(1000, 9999),
      pendingEdits: opts.pendingEdits || null,
      ...opts
    }
  }

  const studentsToInsert = []

  // 1-380: Approved students
  for (let i = 1001; i <= 1380; i++) {
    const existing = await Student.findOne({ rollNo: i })
    if (!existing) studentsToInsert.push(makeStudentData(i, { status: 'Approved', cardNo: rand(1000, 9000) }))
  }

  // 381-430: Approved with zero transactions (empty-state UI)
  for (let i = 1381; i <= 1430; i++) {
    const existing = await Student.findOne({ rollNo: i })
    if (!existing) studentsToInsert.push(makeStudentData(i, { status: 'Approved', cardNo: rand(1000, 9000) }))
  }

  // 431-480: Pending students (untouched registrations)
  for (let i = 1431; i <= 1480; i++) {
    const existing = await Student.findOne({ rollNo: i })
    if (!existing) studentsToInsert.push(makeStudentData(i, { status: 'Pending', cardNo: undefined }))
  }

  // 481-500: Approved with pendingEdits
  for (let i = 1481; i <= 1500; i++) {
    const existing = await Student.findOne({ rollNo: i })
    if (!existing) studentsToInsert.push(makeStudentData(i, {
      status: 'Approved',
      cardNo: rand(1000, 9000),
      pendingEdits: { addr: `Updated Address, ${pick(cities)}`, dept: pick(depts) }
    }))
  }

  // Long unicode name edge case
  const edgeLong = await Student.findOne({ rollNo: 9999 })
  if (!edgeLong) {
    studentsToInsert.push({
      name: 'Venkatanarasimharajuvaripeta Subramaniam Krishnamurthy',
      dob: new Date(2000, 5, 15),
      addr: '42/B, Rajendra Prasad Road, Behind Vishweshwaraiah Industrial Area, Mahadevapura, Bangalore - 560048',
      email: 'student9999@college.edu',
      govtId: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      dept: 'Computer Science',
      rollNo: 9999,
      password: hashedPwd,
      status: 'Approved',
      cardNo: rand(1000, 9000)
    })
  }

  // Near-duplicate student (for Phase 2 duplicate roll-no test — unique email, same other fields)
  const dupA = await Student.findOne({ rollNo: 8001 })
  if (!dupA) {
    studentsToInsert.push({
      name: 'Rahul Sharma', dob: new Date(2001, 3, 10),
      addr: '12, Gandhi Nagar, Mumbai - 400001',
      email: 'student8001@college.edu',
      govtId: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      dept: 'Computer Science', rollNo: 8001,
      password: hashedPwd, status: 'Approved', cardNo: rand(1000, 9000)
    })
  }
  const dupB = await Student.findOne({ rollNo: 8002 })
  if (!dupB) {
    studentsToInsert.push({
      name: 'Rahul Sharma', dob: new Date(2001, 3, 10),
      addr: '12, Gandhi Nagar, Mumbai - 400001',
      email: 'student8002@college.edu',
      govtId: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
      dept: 'Computer Science', rollNo: 8002,
      password: hashedPwd, status: 'Approved', cardNo: rand(1000, 9000)
    })
  }

  if (studentsToInsert.length > 0) {
    await Student.insertMany(studentsToInsert, { ordered: false }).catch(e => {
      if (e.code !== 11000) throw e
    })
    added = studentsToInsert.length
  }

  console.log(`   ✅ Students: ${added} added`)
  return await Student.find({ status: 'Approved' })
}

// ─── Phase 1 — TRANSACTIONS ─────────────────────────────────────────────────

async function seedTransactions(approvedStudents, books) {
  console.log('\n📋 Seeding transactions...')

  const borrowableBooks = books.filter(b => b.globalBookId !== 'gb061' && b.globalBookId !== 'gb062' &&
    b.globalBookId !== 'gb063' && b.globalBookId !== 'gb064')

  let added = 0
  const txns = []
  const bookBorrowCounts = {}

  const BORROW_PERIOD_MS = 14 * 24 * 60 * 60 * 1000

  // Helper to compute frozen fine at return time
  const computeFine = (dueDate, rtrnDate) => {
    const daysLate = Math.max(0, Math.floor((rtrnDate - dueDate) / 86400000))
    return daysLate * 5
  }

  // We build a set of transactions per student
  const studentPool = approvedStudents.slice(0, 380) // Use first 380 approved students for transactions

  for (let i = 0; i < studentPool.length; i++) {
    const student = studentPool[i]
    const numBooks = rand(2, 8)
    const pickedBooks = pickN(borrowableBooks, numBooks)

    for (const book of pickedBooks) {
      bookBorrowCounts[book._id] = (bookBorrowCounts[book._id] || 0) + 1

      // Vary dates across past 12 months
      const borrowDaysAgo = rand(10, 365)
      const brwDate = daysAgo(borrowDaysAgo)
      const dueDate = new Date(brwDate.getTime() + BORROW_PERIOD_MS)
      const now = Date.now()

      // Determine transaction type
      const txnType = rand(0, 4)

      if (txnType === 0) {
        // Currently borrowed, not overdue (within 14 days)
        const recentBrw = daysAgo(rand(1, 13))
        const recentDue = new Date(recentBrw.getTime() + BORROW_PERIOD_MS)
        txns.push({ s_id: student._id, b_id: book._id, brwDate: recentBrw, dueDate: recentDue, renewalCnt: 0, frozenFine: 0 })
      } else if (txnType === 1) {
        // Currently borrowed, overdue
        const oldBrw = daysAgo(rand(20, 60))
        const oldDue = new Date(oldBrw.getTime() + BORROW_PERIOD_MS)
        txns.push({ s_id: student._id, b_id: book._id, brwDate: oldBrw, dueDate: oldDue, renewalCnt: rand(0, 1), frozenFine: 0 })
      } else if (txnType === 2) {
        // Returned on time
        const rtrnDate = new Date(dueDate.getTime() - rand(0, 2) * 86400000)
        txns.push({ s_id: student._id, b_id: book._id, brwDate, dueDate, rtrnDate, renewalCnt: rand(0, 2), frozenFine: 0, amountCollected: 0 })
      } else if (txnType === 3) {
        // Returned overdue — fine crystallized
        const rtrnDaysAfterDue = rand(1, 30)
        const rtrnDate = new Date(dueDate.getTime() + rtrnDaysAfterDue * 86400000)
        if (rtrnDate > now) continue // skip future returns
        const fine = rtrnDaysAfterDue * 5
        // 50% chance already paid
        const paid = Math.random() > 0.5
        txns.push({ s_id: student._id, b_id: book._id, brwDate, dueDate, rtrnDate, renewalCnt: rand(0, 2), frozenFine: paid ? 0 : fine, amountCollected: paid ? fine : 0 })
      } else {
        // Returned, fine waived
        const rtrnDate = new Date(dueDate.getTime() + rand(1, 15) * 86400000)
        if (rtrnDate > now) continue
        txns.push({ s_id: student._id, b_id: book._id, brwDate, dueDate, rtrnDate, renewalCnt: 0, frozenFine: 0, amountCollected: 0 })
      }
    }
  }

  // Edge case: renewalCnt=1 transaction
  const edgeStudent1 = studentPool[0]
  const edgeBook1 = borrowableBooks[0]
  const brw1 = daysAgo(20)
  const due1 = new Date(brw1.getTime() + BORROW_PERIOD_MS) // overdue
  txns.push({ s_id: edgeStudent1._id, b_id: edgeBook1._id, brwDate: brw1, dueDate: due1, renewalCnt: 1, frozenFine: 10 })

  // Edge case: renewalCnt=2 transaction (max renewals reached)
  const edgeStudent2 = studentPool[1]
  const edgeBook2 = borrowableBooks[1]
  const brw2 = daysAgo(25)
  const due2 = new Date(brw2.getTime() + BORROW_PERIOD_MS)
  txns.push({ s_id: edgeStudent2._id, b_id: edgeBook2._id, brwDate: brw2, dueDate: due2, renewalCnt: 2, frozenFine: 25 })

  // Edge case: fine boundary — dueDate exactly 1 day + a few seconds ago
  const edgeStudent3 = studentPool[2]
  const edgeBook3 = borrowableBooks[2]
  const exactDue = new Date(Date.now() - (24 * 3600 * 1000) - 10000) // 24h + 10s ago
  const exactBrw = new Date(exactDue.getTime() - BORROW_PERIOD_MS)
  txns.push({ s_id: edgeStudent3._id, b_id: edgeBook3._id, brwDate: exactBrw, dueDate: exactDue, renewalCnt: 0, frozenFine: 0 })

  // Edge case: dueDate NOT yet past (borrowed, fine=0, pay should succeed as no-op)
  const edgeStudent4 = studentPool[3]
  const edgeBook4 = borrowableBooks[3]
  const futureDue = daysFromNow(5)
  const pastBrw = new Date(futureDue.getTime() - BORROW_PERIOD_MS)
  txns.push({ s_id: edgeStudent4._id, b_id: edgeBook4._id, brwDate: pastBrw, dueDate: futureDue, renewalCnt: 0, frozenFine: 0 })

  // Batch insert
  if (txns.length > 0) {
    await Transaction.insertMany(txns, { ordered: false }).catch(e => {
      if (e.code !== 11000) throw e
    })
    added = txns.length
  }

  // Update book availability for currently-borrowed (no rtrnDate)
  console.log('   📊 Updating book availability counts...')
  const activeTxns = await Transaction.find({ rtrnDate: { $exists: false } })
  const activeCounts = {}
  for (const t of activeTxns) {
    const key = t.b_id.toString()
    activeCounts[key] = (activeCounts[key] || 0) + 1
  }
  for (const [bookId, count] of Object.entries(activeCounts)) {
    const book = await Book.findById(bookId)
    if (book) {
      book.avl = Math.max(0, book.total - count)
      await book.save()
    }
  }

  console.log(`   ✅ Transactions: ${added} added`)
}

// ─── Phase 1 — BOOK REQUESTS ────────────────────────────────────────────────

async function seedBookRequests(approvedStudents) {
  console.log('\n📬 Seeding book requests...')

  // Books with 0 avl
  const zeroAvlIsbns = ['gb061','gb062','gb063','gb064']

  const existingCount = await BookRequest.countDocuments({})
  if (existingCount > 30) {
    console.log(`   ⏭️  Book requests already seeded (${existingCount} found), skipping`)
    return
  }

  const requests = []
  const pool = approvedStudents.slice(10, 80) // 70 students for requests

  // High-demand book: gb061 — requested by 15 students
  const highDemandStudents = pickN(pool, 15)
  for (const s of highDemandStudents) {
    requests.push({ s_id: s._id, isbn: 'gb061' })
  }

  // gb062 — 8 students
  const medDemandStudents = pickN(pool, 8)
  for (const s of medDemandStudents) {
    requests.push({ s_id: s._id, isbn: 'gb062' })
  }

  // gb063, gb064 — 3-5 students each
  for (const isbn of ['gb063','gb064']) {
    const n = rand(3, 5)
    for (const s of pickN(pool, n)) {
      requests.push({ s_id: s._id, isbn })
    }
  }

  if (requests.length > 0) {
    await BookRequest.insertMany(requests, { ordered: false }).catch(e => {
      if (e.code !== 11000) throw e
    })
  }

  console.log(`   ✅ Book requests: ${requests.length} added`)
}

// ─── Phase 1 — ORDERS ───────────────────────────────────────────────────────

async function seedOrders(approvedStudents) {
  console.log('\n📦 Seeding orders...')

  const existingCount = await Order.countDocuments({})
  if (existingCount > 20) {
    console.log(`   ⏭️  Orders already seeded (${existingCount} found), skipping`)
    return
  }

  const ordersData = [
    // Pending Delivery (15 orders)
    { globalBookId:'ob001', orderTitle:'Advanced React Patterns', authors:['Kent C. Dodds'], category:['Programming','React'], copiesOrdered:3, status:'Pending Delivery' },
    { globalBookId:'ob002', orderTitle:'TypeScript Handbook', authors:['Microsoft'], category:['Programming','TypeScript'], copiesOrdered:5, status:'Pending Delivery' },
    { globalBookId:'ob003', orderTitle:'GraphQL in Action', authors:['Samer Buna'], category:['Programming','APIs'], copiesOrdered:2, status:'Pending Delivery' },
    { globalBookId:'ob004', orderTitle:'Web Performance in Action', authors:['Jeremy Wagner'], category:['Programming','Web'], copiesOrdered:3, status:'Pending Delivery' },
    { globalBookId:'ob005', orderTitle:'Fullstack GraphQL', authors:['Julian Mayorga'], category:['Programming'], copiesOrdered:2, status:'Pending Delivery' },
    { globalBookId:'ob006', orderTitle:'Advanced Algorithms', authors:['Jeff Erickson'], category:['Algorithms'], copiesOrdered:4, status:'Pending Delivery' },
    { globalBookId:'ob007', orderTitle:'The Staff Engineer Path', authors:['Tanya Reilly'], category:['Management','Engineering'], copiesOrdered:3, status:'Pending Delivery' },
    { globalBookId:'ob008', orderTitle:'An Elegant Puzzle', authors:['Will Larson'], category:['Management'], copiesOrdered:2, status:'Pending Delivery' },
    { globalBookId:'ob009', orderTitle:'Observability Engineering', authors:['Charity Majors'], category:['DevOps'], copiesOrdered:3, status:'Pending Delivery' },
    { globalBookId:'ob010', orderTitle:'Learning Systems Thinking', authors:['Diana Montalion'], category:['Architecture'], copiesOrdered:2, status:'Pending Delivery' },
    { globalBookId:'ob011', orderTitle:'Software Architecture Patterns', authors:['Mark Richards'], category:['Software Engineering','Architecture'], copiesOrdered:3, status:'Pending Delivery' },
    { globalBookId:'ob012', orderTitle:'The Manager\'s Path', authors:['Camille Fournier'], category:['Management'], copiesOrdered:4, status:'Pending Delivery' },
    { globalBookId:'ob013', orderTitle:'Building Microservices', authors:['Sam Newman'], category:['Architecture','Software Engineering'], copiesOrdered:3, status:'Pending Delivery' },
    { globalBookId:'ob014', orderTitle:'Continuous Delivery', authors:['Jez Humble'], category:['DevOps','Engineering'], copiesOrdered:2, status:'Pending Delivery' },
    { globalBookId:'ob015', orderTitle:'Team Topologies', authors:['Skelton & Pais'], category:['Management','Engineering'], copiesOrdered:3, status:'Pending Delivery' },

    // Received (15 orders)
    { globalBookId:'ob016', orderTitle:'Go Programming Language', authors:['Donovan & Kernighan'], category:['Programming','Go'], copiesOrdered:4, status:'Received' },
    { globalBookId:'ob017', orderTitle:'Rust Programming Language', authors:['Steve Klabnik'], category:['Programming','Rust'], copiesOrdered:3, status:'Received' },
    { globalBookId:'ob018', orderTitle:'Designing Data-Intensive Apps', authors:['Martin Kleppmann'], category:['Databases','Architecture'], copiesOrdered:5, status:'Received' },
    { globalBookId:'ob019', orderTitle:'The Clean Coder', authors:['Robert C. Martin'], category:['Programming','Career'], copiesOrdered:4, status:'Received' },
    { globalBookId:'ob020', orderTitle:'Accelerate', authors:['Nicole Forsgren'], category:['DevOps','Management'], copiesOrdered:3, status:'Received' },
    { globalBookId:'ob021', orderTitle:'The DevOps Handbook', authors:['Gene Kim'], category:['DevOps'], copiesOrdered:3, status:'Received' },
    { globalBookId:'ob022', orderTitle:'Working Effectively with Legacy Code', authors:['Michael Feathers'], category:['Programming','Software Engineering'], copiesOrdered:2, status:'Received' },
    { globalBookId:'ob023', orderTitle:'Growing Object-Oriented Software Guided by Tests', authors:['Freeman & Pryce'], category:['Programming','Testing'], copiesOrdered:2, status:'Received' },
    { globalBookId:'ob024', orderTitle:'The Art of Unit Testing', authors:['Roy Osherove'], category:['Programming','Testing'], copiesOrdered:3, status:'Received' },
    { globalBookId:'ob025', orderTitle:'Test Driven Development By Example', authors:['Kent Beck'], category:['Programming','Testing'], copiesOrdered:4, status:'Received' },
    { globalBookId:'ob026', orderTitle:'Extreme Programming Explained', authors:['Kent Beck'], category:['Software Engineering'], copiesOrdered:3, status:'Received' },
    { globalBookId:'ob027', orderTitle:'The Goal', authors:['Eliyahu M. Goldratt'], category:['Management','Business'], copiesOrdered:5, status:'Received' },
    { globalBookId:'ob028', orderTitle:'Effective Python', authors:['Brett Slatkin'], category:['Programming','Python'], copiesOrdered:4, status:'Received' },
    { globalBookId:'ob029', orderTitle:'SQL Performance Explained', authors:['Markus Winand'], category:['Databases'], copiesOrdered:3, status:'Received' },
    { globalBookId:'ob030', orderTitle:'High Performance MySQL', authors:['Schwartz et al.'], category:['Databases'], copiesOrdered:2, status:'Received' },
  ]

  const requestersPool = approvedStudents.slice(80, 120)
  const ordersToInsert = ordersData.map(o => ({
    ...o,
    requesters: pickN(requestersPool, rand(0, 5)).map(s => s._id)
  }))

  await Order.insertMany(ordersToInsert, { ordered: false }).catch(e => {
    if (e.code !== 11000) throw e
  })

  console.log(`   ✅ Orders: ${ordersToInsert.length} added`)
}

// ─── Phase 1 — NOTIFICATIONS ────────────────────────────────────────────────

async function seedNotifications(approvedStudents) {
  console.log('\n🔔 Seeding notifications...')

  const existingCount = await Notification.countDocuments({})
  if (existingCount > 100) {
    console.log(`   ⏭️  Notifications already seeded (${existingCount} found), skipping`)
    return
  }

  const messages = [
    'Your library registration has been approved. Welcome!',
    'Your book request has been fulfilled. Visit the library to borrow it.',
    'Your profile update request has been approved.',
    'Your fine has been waived by the library staff.',
    'Reminder: You have an overdue book. Please return or renew it.',
    'Your account has been successfully created.',
    'A book you requested is now available at the library.',
    'Your profile update has been declined. Please contact admin.',
    'Your borrowed book is due in 2 days. Please renew or return.',
    'New books added to the library. Check the catalogue!',
    'Library will be closed on the upcoming national holiday.',
    'Your fine payment was successful.',
    'Book renewal approved. Due date extended by 7 days.',
    'Maximum renewals reached. Please return the book.',
  ]

  const pool = approvedStudents.slice(0, 200)
  const notifications = []

  for (const s of pool) {
    const n = rand(0, 3)
    for (let i = 0; i < n; i++) {
      notifications.push({
        s_id: s._id,
        msg: pick(messages),
        status: Math.random() > 0.4 ? 'Unread' : 'Read'
      })
    }
  }

  if (notifications.length > 0) {
    await Notification.insertMany(notifications, { ordered: false }).catch(e => {
      if (e.code !== 11000) throw e
    })
  }

  console.log(`   ✅ Notifications: ${notifications.length} added`)
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

export async function bulkSeed() {
  console.log('🚀 BulkSeed starting...')
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('✅ Connected to MongoDB')

  const books = await seedBooks()
  await seedEmployees()
  const approvedStudents = await seedStudents()
  await seedTransactions(approvedStudents, books)
  await seedBookRequests(approvedStudents)
  await seedOrders(approvedStudents)
  await seedNotifications(approvedStudents)

  console.log('\n📊 Final collection counts:')
  console.log(`   Books:         ${await Book.countDocuments({})}`)
  console.log(`   Students:      ${await Student.countDocuments({})}`)
  console.log(`   Employees:     ${await Employee.countDocuments({})}`)
  console.log(`   Transactions:  ${await Transaction.countDocuments({})}`)
  console.log(`   BookRequests:  ${await BookRequest.countDocuments({})}`)
  console.log(`   Orders:        ${await Order.countDocuments({})}`)
  console.log(`   Notifications: ${await Notification.countDocuments({})}`)

  console.log('\n✅ BulkSeed completed successfully.')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  bulkSeed().then(() => {
    mongoose.disconnect()
    process.exit(0)
  }).catch(err => {
    console.error('❌ Seed failed:', err)
    process.exit(1)
  })
}
