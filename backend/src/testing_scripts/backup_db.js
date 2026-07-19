import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { Book } from '../models/book.model.js';
import { Student } from '../models/student.model.js';
import { Employee } from '../models/employee.model.js';
import { Transaction } from '../models/transaction.model.js';
import { BookRequest } from '../models/bookRequest.model.js';
import { Order } from '../models/order.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const backupDir = path.join(__dirname, '..', 'db', 'data_backup');

async function backup() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for backup...');

        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        const models = [
            { name: 'books.json', model: Book },
            { name: 'students.json', model: Student },
            { name: 'employees.json', model: Employee },
            { name: 'transactions.json', model: Transaction },
            { name: 'bookRequests.json', model: BookRequest },
            { name: 'orders.json', model: Order }
        ];

        for (const m of models) {
            const data = await m.model.find({});
            fs.writeFileSync(path.join(backupDir, m.name), JSON.stringify(data, null, 2));
            console.log(`Backed up ${data.length} records to ${m.name}`);
        }

        console.log('Backup completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Backup failed:', error);
        process.exit(1);
    }
}

backup();
