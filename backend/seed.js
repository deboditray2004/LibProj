import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { Book } from './src/models/book.model.js';
import { Student } from './src/models/student.model.js';
import { Employee } from './src/models/employee.model.js';
import { Transaction } from './src/models/transaction.model.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadJSON(filename) {
  const filePath = path.join(__dirname, 'src', 'db', 'data', filename);
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function seed() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB for seeding...');
    }

    // 1. Seed Employees (Append Only)
    const employeesData = await loadJSON('employees.json');
    for (const empData of employeesData) {
      const exists = await Employee.findOne({ empId: empData.empId });
      if (!exists) {
        const hashedPassword = await bcrypt.hash(empData.password, 10);
        await Employee.create({ ...empData, password: hashedPassword });
        console.log(`Appended Employee: ${empData.empId}`);
      }
    }

    // 2. Seed Students (Append Only)
    const studentsData = await loadJSON('students.json');
    for (const stuData of studentsData) {
      const exists = await Student.findOne({ rollNo: stuData.rollNo });
      if (!exists) {
        const hashedPassword = await bcrypt.hash(stuData.password, 10);
        await Student.create({ ...stuData, password: hashedPassword });
        console.log(`Appended Student: ${stuData.rollNo}`);
      }
    }

    // 3. Seed Books (Append Only)
    const booksData = await loadJSON('books.json');
    for (const bookData of booksData) {
      const exists = await Book.findOne({ globalBookId: bookData.globalBookId });
      if (!exists) {
        await Book.create(bookData);
        console.log(`Appended Book: ${bookData.globalBookId}`);
      }
    }

    // 4. Seed Transactions (Append Only, Mapping refs)
    const txnsData = await loadJSON('transactions.json');
    for (const txnData of txnsData) {
      const student = await Student.findOne({ rollNo: txnData.studentRollNo });
      const book = await Book.findOne({ globalBookId: txnData.globalBookId });

      if (student && book) {
        // Prevent duplicate seed transactions by checking if one exists for this student+book
        const exists = await Transaction.findOne({ s_id: student._id, b_id: book._id });
        if (!exists) {
          const now = Date.now();
          const newTxn = new Transaction({
            s_id: student._id,
            b_id: book._id,
            brwDate: new Date(now + txnData.borrowDateOffsetDays * 86400000),
            dueDate: new Date(now + txnData.dueDateOffsetDays * 86400000),
            status: txnData.status,
            renewalCnt: txnData.renewalCnt
          });

          if (txnData.rtrnDateOffsetDays) {
            newTxn.rtrnDate = new Date(now + txnData.rtrnDateOffsetDays * 86400000);
            newTxn.frozenFine = txnData.fine || 0;
          }

          await newTxn.save();
          // Decrease availability
          book.avl = Math.max(0, book.avl - 1);
          await book.save();
          console.log(`Appended Transaction for Student: ${txnData.studentRollNo}`);
        }
      }
    }

    console.log('Seed process completed successfully (Append-Only mode).');
  } catch (error) {
    console.error('Seed error:', error);
  }
}

// Execute if run directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seed().then(() => process.exit(0)).catch(() => process.exit(1));
}
