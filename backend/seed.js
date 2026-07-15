import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { Book } from './src/models/book.model.js';
import { Student } from './src/models/student.model.js';
import { Employee } from './src/models/employee.model.js';
import { Transaction } from './src/models/transaction.model.js';

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clean existing data
    await Book.deleteMany({});
    await Student.deleteMany({});
    await Employee.deleteMany({});
    await Transaction.deleteMany({});
    console.log('Cleared existing data');

    // 1. Create Employee
    const empPassword = await bcrypt.hash('password123', 10);
    const emp = {
      empId: 1001,
      name: 'Admin User',
      email: 'admin@library.com',
      password: empPassword,
    };
    await Employee.insertMany([emp]);
    console.log('Created Employee 1001');

    // 2. Create Students
    const studentPassword = await bcrypt.hash('password123', 10);
    const student1 = {
      cardNo: 4821,
      name: 'Alice Johnson',
      dob: new Date('2000-01-01'),
      addr: '123 College St',
      email: 'alice@example.com',
      password: studentPassword,
      dept: 'Computer Science',
      rollNo: 101,
      photo: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
      govtId: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
      status: 'Approved'
    };
    const student2 = {
      cardNo: 4822,
      name: 'Bob Smith',
      dob: new Date('1999-05-15'),
      addr: '456 History Blvd',
      email: 'bob@example.com',
      password: studentPassword,
      dept: 'History',
      rollNo: 102,
      photo: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
      govtId: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
      status: 'Approved'
    };
    const insertedStudents = await Student.insertMany([student1, student2]);
    console.log('Created Students: 4821, 4822');

    // 3. Fetch Books
    console.log('Fetching books from Google Books API...');
    const queries = ['javascript', 'history', 'design', 'physics', 'finance'];
    let booksToInsert = [];

    for (const q of queries) {
      const res = await fetch(`https://openlibrary.org/search.json?q=${q}&limit=10`);
      const data = await res.json();
      const items = data.docs || [];
      
      for (const item of items) {
        const globalId = item.key;
        if (!globalId) continue;

        booksToInsert.push({
          globalBookId: globalId,
          title: item.title || 'Unknown Title',
          authors: item.author_name || ['Unknown Author'],
          category: (item.subject && item.subject.length > 0) ? item.subject.slice(0, 3) : [q.charAt(0).toUpperCase() + q.slice(1)],
          coverImg: item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg` : '',
          total: 5,
          avl: 5
        });
      }
    }

    // Deduplicate by globalBookId
    const uniqueBooks = Array.from(new Map(booksToInsert.map(b => [b.globalBookId, b])).values());
    const insertedBooks = await Book.insertMany(uniqueBooks.slice(0, 50));
    console.log(`Inserted ${insertedBooks.length} books`);

    // 4. Create Dummy Transactions
    const t1 = {
      s_id: insertedStudents[0]._id,
      b_id: insertedBooks[0]._id,
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      status: 'Borrowed',
      renewalCnt: 0
    };
    const t2 = {
      s_id: insertedStudents[0]._id,
      b_id: insertedBooks[1]._id,
      borrowDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago (Overdue)
      status: 'Borrowed',
      renewalCnt: 0
    };
    const t3 = {
      s_id: insertedStudents[1]._id,
      b_id: insertedBooks[2]._id,
      borrowDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      returnDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      fine: 5 * 10, // 5 days late * 10 rs = 50 rs
      status: 'Returned'
    };
    await Transaction.insertMany([t1, t2, t3]);
    
    await Book.updateOne({ _id: insertedBooks[0]._id }, { $inc: { avl: -1 } });
    await Book.updateOne({ _id: insertedBooks[1]._id }, { $inc: { avl: -1 } });
    console.log('Created dummy transactions');

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
