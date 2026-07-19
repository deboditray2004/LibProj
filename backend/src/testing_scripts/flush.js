import mongoose from 'mongoose';
import { Book } from '../models/book.model.js';
import { Student } from '../models/student.model.js';
import { Employee } from '../models/employee.model.js';
import { Transaction } from '../models/transaction.model.js';
import { Order } from '../models/order.model.js';
import { BookRequest } from '../models/bookRequest.model.js';
import { backupDB } from './backup_db.js';

export async function flushDatabase() {
    console.log('Initiating database flush sequence...');
    
    // 1. Force Backup before ANY destructive action
    await backupDB();
    
    // 2. Perform Flush
    console.log('Backup secured. Flushing existing data...');
    await Promise.all([
        Book.deleteMany({}),
        Student.deleteMany({}),
        Employee.deleteMany({}),
        Transaction.deleteMany({}),
        Order.deleteMany({}),
        BookRequest.deleteMany({})
    ]);
    console.log('Database flushed successfully.');
}
