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

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB. Flushing existing data...');

        // Flush DB
        await Promise.all([
            Book.deleteMany({}),
            Student.deleteMany({}),
            Employee.deleteMany({}),
            Transaction.deleteMany({}),
            Order.deleteMany({}),
            BookRequest.deleteMany({})
        ]);
        console.log('Database flushed.');

        // 1. Employees
        const admin = await Employee.create({
            empId: 1001,
            name: "Admin User",
            email: "admin@library.com",
            password: 'password'
        });
        
        const emp2 = await Employee.create({
            empId: 1002,
            name: "Jane Smith",
            email: "jane.smith@library.com",
            password: 'password'
        });
        console.log('Employees created.');

        // 2. Students
        const s1 = await Student.create({
            cardNo: 2001,
            name: "John Doe",
            dob: new Date("2000-05-15"),
            addr: "123 Main St, Mumbai",
            email: "johndoe@student.edu",
            govtId: "AADHAAR12345",
            dept: "Computer Science",
            rollNo: 2001,
            password: 'password',
            tot_fine: 0,
            status: "Approved"
        });

        const s2 = await Student.create({
            cardNo: 2002,
            name: "Alice Johnson",
            dob: new Date("2001-08-22"),
            addr: "456 Park Avenue, Delhi",
            email: "alicej@student.edu",
            govtId: "PAN987654",
            dept: "Electronics",
            rollNo: 2002,
            password: 'password',
            tot_fine: 50,
            status: "Approved"
        });
        console.log('Students created.');

        // 3. Books
        const b1 = await Book.create({
            globalBookId: "9780132350884", // Clean Code
            title: "Clean Code: A Handbook of Agile Software Craftsmanship",
            authors: ["Robert C. Martin"],
            category: ["Programming", "Software Engineering"],
            coverImg: DUMMY_IMAGE,
            total: 10,
            avl: 9
        });

        const b2 = await Book.create({
            globalBookId: "9780201616224", // Pragmatic Programmer
            title: "The Pragmatic Programmer: Your Journey To Mastery",
            authors: ["David Thomas", "Andrew Hunt"],
            category: ["Programming"],
            coverImg: DUMMY_IMAGE,
            total: 5,
            avl: 4
        });
        
        const b3 = await Book.create({
            globalBookId: "9780262033848", // Intro to Algorithms
            title: "Introduction to Algorithms",
            authors: ["Thomas H. Cormen", "Charles E. Leiserson"],
            category: ["Computer Science", "Algorithms"],
            coverImg: DUMMY_IMAGE,
            total: 8,
            avl: 8
        });
        console.log('Books created.');

        // 4. Transactions
        const now = Date.now();
        await Transaction.create({
            s_id: s1._id,
            b_id: b1._id,
            brwDate: new Date(now - 5 * 86400000), // 5 days ago
            dueDate: new Date(now + 10 * 86400000), // due in 10 days
            status: "Issued",
            renewalCnt: 0
        });

        await Transaction.create({
            s_id: s2._id,
            b_id: b2._id,
            brwDate: new Date(now - 20 * 86400000), // 20 days ago
            dueDate: new Date(now - 5 * 86400000), // overdue by 5 days
            rtrnDate: new Date(now - 1 * 86400000), // returned yesterday
            status: "Returned",
            renewalCnt: 1,
            frozenFine: 50,
            amountCollected: 0
        });
        console.log('Transactions created.');

        console.log('Baseline seeding completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();
