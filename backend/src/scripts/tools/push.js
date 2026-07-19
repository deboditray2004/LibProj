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
import { flushDatabase } from './flush.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export async function pushDB(filePath) {
    try {
        const fullPath = path.resolve(process.cwd(), filePath);
        
        if (!fs.existsSync(fullPath)) {
            throw new Error(`Target file does not exist: ${fullPath}`);
        }

        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('Connected to MongoDB.');
        }

        // flushDatabase safely backs up the current state before wiping!
        await flushDatabase();

        const models = {
            books: Book,
            students: Student,
            employees: Employee,
            transactions: Transaction,
            bookRequests: BookRequest,
            orders: Order
        };

        console.log(`\nPushing data from ${filePath}...`);
        
        const fileData = fs.readFileSync(fullPath, 'utf8');
        const parsedData = JSON.parse(fileData);

        for (const [key, model] of Object.entries(models)) {
            const dataArray = parsedData[key];
            if (dataArray && dataArray.length > 0) {
                await model.insertMany(dataArray);
                console.log(`Pushed ${dataArray.length} records into ${key}`);
            } else {
                console.log(`Skipped ${key} (0 records)`);
            }
        }

        console.log('\nDatabase push completed successfully.');
    } catch (error) {
        console.error('Push failed:', error);
        throw error;
    }
}

// Allow calling independently via CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const targetFile = process.argv[2];
    if (!targetFile) {
        console.error("Usage: node push.js <relative_path_to_json>");
        process.exit(1);
    }
    pushDB(targetFile).then(() => process.exit(0)).catch(() => process.exit(1));
}
