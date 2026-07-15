import mongoose from 'mongoose';
import dotenv from 'dotenv';
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
    const emp = new Employee({
      empId: 1001,
      name: 'Admin User',
      email: 'admin@library.com',
      password: 'password123',
    });
    await emp.save();
    console.log('Created Employee 1001');

    // 2. Create Students
    const student1 = new Student({
      cardNo: 4821,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      password: 'password123', // Will be hashed by pre-save hook
      department: 'Computer Science',
      photoUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
      govtIdUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
      status: 'Approved'
    });
    const student2 = new Student({
      cardNo: 4822,
      name: 'Bob Smith',
      email: 'bob@example.com',
      password: 'password123',
      department: 'History',
      photoUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
      govtIdUrl: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
      status: 'Approved'
    });
    await student1.save();
    await student2.save();
    console.log('Created Students: 4821, 4822');

    // 3. Fetch Books
    console.log('Fetching books from Google Books API...');
    const queries = ['javascript', 'history', 'design', 'physics', 'finance'];
    let booksToInsert = [];

    for (const q of queries) {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=10`);
      const data = await res.json();
      const items = data.items || [];
      
      for (const item of items) {
        const info = item.volumeInfo;
        const isbn13 = info.industryIdentifiers?.find(i => i.type === 'ISBN_13')?.identifier;
        if (!isbn13) continue;

        booksToInsert.push({
          globalBookId: isbn13,
          title: info.title || 'Unknown Title',
          authors: info.authors || ['Unknown Author'],
          category: info.categories || [q.charAt(0).toUpperCase() + q.slice(1)],
          coverImg: info.imageLinks?.thumbnail?.replace('http:', 'https:') || '',
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
    // Borrow book 1 (Active, not due yet)
    const t1 = new Transaction({
      studentId: student1._id,
      bookId: insertedBooks[0]._id,
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      status: 'Borrowed',
      renewalCnt: 0
    });
    insertedBooks[0].avl -= 1;
    await insertedBooks[0].save();

    // Borrow book 2 (Overdue -> Active fine)
    const t2 = new Transaction({
      studentId: student1._id,
      bookId: insertedBooks[1]._id,
      borrowDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago (Overdue)
      status: 'Borrowed',
      renewalCnt: 0
    });
    insertedBooks[1].avl -= 1;
    await insertedBooks[1].save();

    // Return book 3 (Returned late -> Frozen fine)
    const t3 = new Transaction({
      studentId: student2._id,
      bookId: insertedBooks[2]._id,
      borrowDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      returnDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      fine: 5 * 10, // 5 days late * 10 rs = 50 rs
      status: 'Returned'
    });

    await Promise.all([t1.save(), t2.save(), t3.save()]);
    console.log('Created dummy transactions');

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
