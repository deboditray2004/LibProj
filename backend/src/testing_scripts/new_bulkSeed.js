import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';

import { Book } from '../models/book.model.js';
import { Student } from '../models/student.model.js';
import { Employee } from '../models/employee.model.js';
import { Transaction } from '../models/transaction.model.js';
import { Order } from '../models/order.model.js';
import { BookRequest } from '../models/bookRequest.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const DUMMY_IMAGE = 'http://localhost:8000/dummy.png';

// Realistic Data Pools
const firstNames = ['Aarav','Aditya','Ananya','Arjun','Bhavya','Deepak','Divya','Farhan','Gaurav','Ishaan','Kavya','Lakshmi','Manav','Mehak','Nisha','Pooja','Rahul','Ritika','Rohan','Sakshi','Sanjay','Shreya','Sneha','Soham','Tanvi','Vishal','Yash','Zara'];
const lastNames = ['Sharma','Verma','Singh','Patel','Kumar','Gupta','Joshi','Mehta','Shah','Rao','Nair','Iyer','Banerjee','Das','Bose','Reddy','Naidu','Mishra','Tiwari','Pandey','Yadav','Kapoor','Malhotra','Arora','Jain','Kaur','Gill'];
const depts = ['Computer Science','Electronics','Mechanical','Civil','Chemical','Biotechnology','Mathematics','Physics','Economics','Business Administration','Architecture','Data Science','AI & ML'];
const cities = ['Mumbai','Delhi','Bangalore','Chennai','Kolkata','Hyderabad','Pune','Ahmedabad','Jaipur','Lucknow','Surat','Nagpur','Chandigarh','Patna'];
const streets = ['MG Road','Station Road','Gandhi Nagar','Nehru Street','Patel Colony','Subhash Chowk','Tilak Road','Shivaji Nagar','Civil Lines','Model Town','Brigade Road'];

// Real Book Data (Valid ISBNs and metadata)
const BOOKS_DATA = [
  { globalBookId:'9780132350884', title:'Clean Code', authors:['Robert C. Martin'], category:['Programming','Software Engineering'] },
  { globalBookId:'9780201616224', title:'The Pragmatic Programmer', authors:['David Thomas','Andrew Hunt'], category:['Programming'] },
  { globalBookId:'9780201633610', title:'Design Patterns', authors:['Erich Gamma', 'Richard Helm'], category:['Programming','Software Engineering'] },
  { globalBookId:'9780262033848', title:'Introduction to Algorithms', authors:['Thomas H. Cormen'], category:['Computer Science','Algorithms'] },
  { globalBookId:'9780201896831', title:'The Art of Computer Programming', authors:['Donald E. Knuth'], category:['Computer Science'] },
  { globalBookId:'9780262510875', title:'Structure and Interpretation of Computer Programs', authors:['Harold Abelson'], category:['Computer Science','Programming'] },
  { globalBookId:'9781118063330', title:'Operating System Concepts', authors:['Abraham Silberschatz'], category:['Operating Systems','Computer Science'] },
  { globalBookId:'9780132126953', title:'Computer Networks', authors:['Andrew S. Tanenbaum'], category:['Networking','Computer Science'] },
  { globalBookId:'9780073523323', title:'Database System Concepts', authors:['Abraham Silberschatz'], category:['Databases','Computer Science'] },
  { globalBookId:'9780136042594', title:'Artificial Intelligence: A Modern Approach', authors:['Stuart Russell','Peter Norvig'], category:['Artificial Intelligence','Computer Science'] },
  { globalBookId:'9780070428072', title:'Machine Learning', authors:['Tom M. Mitchell'], category:['Machine Learning','Artificial Intelligence'] },
  { globalBookId:'9780262035613', title:'Deep Learning', authors:['Ian Goodfellow'], category:['Machine Learning','Deep Learning'] },
  { globalBookId:'9781593279288', title:'Python Crash Course', authors:['Eric Matthes'], category:['Programming','Python'] },
  { globalBookId:'9781491946008', title:'Fluent Python', authors:['Luciano Ramalho'], category:['Programming','Python'] },
  { globalBookId:'9780596517748', title:'JavaScript: The Good Parts', authors:['Douglas Crockford'], category:['Programming','JavaScript'] }
];

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[rand(0, arr.length - 1)];
const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

async function bulkSeed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB. Flushing existing data...');

        // Full Flush
        await Promise.all([
            Book.deleteMany({}),
            Student.deleteMany({}),
            Employee.deleteMany({}),
            Transaction.deleteMany({}),
            Order.deleteMany({}),
            BookRequest.deleteMany({})
        ]);
        console.log('Database flushed for bulk seed.');

        // 1. Employee
        await Employee.create({
            empId: 1001,
            name: "Admin User",
            email: "admin@library.com",
            password: 'password'
        });
        await Employee.create({
            empId: 1002,
            name: "Librarian Alice",
            email: "alice@library.com",
            password: 'password'
        });
        await Employee.create({
            empId: 1003,
            name: "Assistant Bob",
            email: "bob@library.com",
            password: 'password'
        });
        console.log('Created 3 Employees (1001, 1002, 1003).');

        // 2. Books (Use the 15 real books)
        const createdBooks = [];
        for (const b of BOOKS_DATA) {
            const copies = rand(5, 15);
            const newBook = await Book.create({
                ...b,
                coverImg: DUMMY_IMAGE,
                total: copies,
                avl: copies
            });
            createdBooks.push(newBook);
        }
        console.log(`Created ${createdBooks.length} Books.`);

        // 3. Students (Create 100 students)
        const createdStudents = [];
        for (let i = 0; i < 100; i++) {
            const fname = pick(firstNames);
            const lname = pick(lastNames);
            const roll = 2000 + i;
            const stu = await Student.create({
                cardNo: roll,
                name: `${fname} ${lname}`,
                dob: randomDate(new Date('1998-01-01'), new Date('2005-12-31')),
                addr: `${rand(1, 999)} ${pick(streets)}, ${pick(cities)}`,
                email: `${fname.toLowerCase()}.${lname.toLowerCase()}${i}@student.edu`,
                govtId: `UID${rand(10000000, 99999999)}`,
                dept: pick(depts),
                rollNo: roll,
                password: 'password',
                tot_fine: 0,
                status: "Approved"
            });
            createdStudents.push(stu);
        }
        console.log(`Created ${createdStudents.length} Students.`);

        // 4. Transactions (Create ~200 transactions)
        const now = Date.now();
        let activeTxns = 0;
        let pastTxns = 0;

        for (let i = 0; i < 200; i++) {
            const s = pick(createdStudents);
            const b = pick(createdBooks);
            
            // Check if student already has this book
            const exists = await Transaction.findOne({ s_id: s._id, b_id: b._id });
            if (exists) continue;

            const isReturned = Math.random() > 0.4; // 60% returned, 40% active
            
            if (isReturned) {
                const borrowOffset = rand(15, 60);
                const brwDate = new Date(now - borrowOffset * 86400000);
                const dueDate = new Date(brwDate.getTime() + 15 * 86400000);
                const rtrnDate = new Date(brwDate.getTime() + rand(5, 20) * 86400000);
                
                let frozenFine = 0;
                if (rtrnDate > dueDate) {
                    frozenFine = Math.floor((rtrnDate - dueDate) / 86400000) * 10;
                }

                await Transaction.create({
                    s_id: s._id,
                    b_id: b._id,
                    brwDate,
                    dueDate,
                    rtrnDate,
                    status: "Returned",
                    renewalCnt: rand(0, 2),
                    frozenFine,
                    amountCollected: frozenFine // Assume all past fines paid for simplicity
                });
                pastTxns++;
            } else {
                if (b.avl > 0) {
                    const borrowOffset = rand(1, 20);
                    const brwDate = new Date(now - borrowOffset * 86400000);
                    const dueDate = new Date(brwDate.getTime() + 15 * 86400000);

                    await Transaction.create({
                        s_id: s._id,
                        b_id: b._id,
                        brwDate,
                        dueDate,
                        status: "Issued",
                        renewalCnt: rand(0, 1)
                    });
                    
                    b.avl -= 1;
                    await b.save();
                    activeTxns++;
                }
            }
        }
        console.log(`Created ${pastTxns} Past Transactions and ${activeTxns} Active Transactions.`);

        console.log('Bulk seeding completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Bulk seeding failed:', error);
        process.exit(1);
    }
}

bulkSeed();
