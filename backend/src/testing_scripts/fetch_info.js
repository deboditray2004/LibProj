import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Employee } from '../models/employee.model.js';
import { Student } from '../models/student.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function fetchInfo() {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const emp = await Employee.find({});
    console.log("=== EMPLOYEES ===");
    emp.forEach(e => console.log(`ID (empId): ${e.empId} | Email: ${e.email} | Name: ${e.name} | Password: password`));

    const stds = await Student.find({}).limit(10);
    console.log("\n=== FIRST 10 STUDENTS ===");
    stds.forEach(s => console.log(`Card/Roll No: ${s.rollNo} | Email: ${s.email} | Name: ${s.name} | Password: password`));

    process.exit(0);
}
fetchInfo();
