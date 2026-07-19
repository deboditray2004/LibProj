import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { Book } from '../../models/book.model.js';
import { Student } from '../../models/student.model.js';
import { Employee } from '../../models/employee.model.js';
import { Transaction } from '../../models/transaction.model.js';
import { BookRequest } from '../../models/bookRequest.model.js';
import { Order } from '../../models/order.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const backupDir = path.join(__dirname, '..', 'backup');

export async function backupDB() {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('Connected to MongoDB for backup...');
        }

        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        let version = 1;
        while (fs.existsSync(path.join(backupDir, `backup_${version}.json`))) {
            version++;
        }
        const currentBackupFile = path.join(backupDir, `backup_${version}.json`);

        const models = {
            books: Book,
            students: Student,
            employees: Employee,
            transactions: Transaction,
            bookRequests: BookRequest,
            orders: Order
        };

        const backupData = {};

        for (const [key, model] of Object.entries(models)) {
            const data = await model.find({});
            backupData[key] = data;
            console.log(`Exported ${data.length} records from ${key}`);
        }

        fs.writeFileSync(currentBackupFile, JSON.stringify(backupData, null, 2));
        console.log(`Backup completed successfully: backup_${version}.json`);
    } catch (error) {
        console.error('Backup failed:', error);
        throw error;
    }
}

// Allow calling independently
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    backupDB().then(() => process.exit(0)).catch(() => process.exit(1));
}
