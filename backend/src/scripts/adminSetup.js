import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { Book } from '../models/book.model.js';
import { Student } from '../models/student.model.js';
import { Employee } from '../models/employee.model.js';
import { Transaction } from '../models/transaction.model.js';
import { BookRequest } from '../models/bookRequest.model.js';

import { seed } from '../../seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  }
}

async function flushDatabase() {
  await connectDB();
  console.warn('⚠️ WARNING: Flushing entire database...');
  await Book.deleteMany({});
  await Student.deleteMany({});
  await Employee.deleteMany({});
  await Transaction.deleteMany({});
  await BookRequest.deleteMany({});
  console.log('Database flushed successfully.');
}

async function addEntity(entity, dataString) {
  await connectDB();
  const data = JSON.parse(dataString);
  let result;
  switch (entity.toLowerCase()) {
    case 'student':
      result = await Student.create(data);
      break;
    case 'employee':
      result = await Employee.create(data);
      break;
    case 'book':
      result = await Book.create(data);
      break;
    default:
      console.error('Invalid entity type. Use student, employee, or book.');
      process.exit(1);
  }
  console.log(`Successfully added ${entity}:`, result._id);
}

async function removeEntity(entity, id) {
  await connectDB();
  let result;
  switch (entity.toLowerCase()) {
    case 'student':
      result = await Student.findByIdAndDelete(id);
      break;
    case 'employee':
      result = await Employee.findByIdAndDelete(id);
      break;
    case 'book':
      result = await Book.findByIdAndDelete(id);
      break;
    default:
      console.error('Invalid entity type. Use student, employee, or book.');
      process.exit(1);
  }
  if (result) {
    console.log(`Successfully removed ${entity} with ID: ${id}`);
  } else {
    console.log(`${entity} with ID ${id} not found.`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log(`
Usage:
  node adminSetup.js --add <entity> '<json_data>'
  node adminSetup.js --remove <entity> <id>
  node adminSetup.js --flush
  node adminSetup.js --seed
    `);
    process.exit(0);
  }

  const command = args[0];

  try {
    switch (command) {
      case '--add':
        if (args.length < 3) throw new Error('Missing arguments for --add');
        await addEntity(args[1], args[2]);
        break;
      case '--remove':
        if (args.length < 3) throw new Error('Missing arguments for --remove');
        await removeEntity(args[1], args[2]);
        break;
      case '--flush':
        await flushDatabase();
        break;
      case '--seed':
        await connectDB();
        await seed();
        break;
      default:
        console.error('Unknown command:', command);
    }
  } catch (error) {
    console.error('Error executing command:', error.message);
  } finally {
    process.exit(0);
  }
}

main();
