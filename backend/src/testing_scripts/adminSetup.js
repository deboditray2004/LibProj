import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { Employee } from '../models/employee.model.js';
import { Book } from '../models/book.model.js';
import { Student } from '../models/student.model.js';
import { Transaction } from '../models/transaction.model.js';
import { BookRequest } from '../models/bookRequest.model.js';
import { Order } from '../models/order.model.js';
import { bulkSeed } from './bulkSeed.js';
import { flushDatabase } from './flush.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  }
}

// Flush database is now handled centrally by flush.js

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log(`
Usage:
  node adminSetup.js --seed
  node adminSetup.js --add-employee '<json_data>'
  node adminSetup.js --remove-employee <id>
  node adminSetup.js --flush
    `);
    process.exit(0);
  }

  const command = args[0];

  try {
    switch (command) {
      case '--seed':
        await connectDB();
        await bulkSeed();
        break;
      case '--flush':
        await flushDatabase();
        break;
      case '--add-employee':
        if (args.length < 2) throw new Error('Missing JSON argument for --add-employee');
        await connectDB();
        const data = JSON.parse(args[1]);
        const added = await Employee.create(data);
        console.log(`Successfully added employee:`, added._id);
        break;
      case '--remove-employee':
        if (args.length < 2) throw new Error('Missing ID argument for --remove-employee');
        await connectDB();
        const removedEmp = await Employee.findByIdAndDelete(args[1]);
        if (removedEmp) {
          console.log(`Successfully removed employee with ID: ${args[1]}`);
        } else {
          console.log(`Employee with ID ${args[1]} not found.`);
        }
        break;
      default:
        console.error('Unknown command:', command);
    }
  } catch (error) {
    console.error('Error executing command:', error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

main();
