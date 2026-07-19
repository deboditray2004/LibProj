import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Employee } from '../../models/employee.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function main() {
    try {
        const jsonData = process.argv[2];
        if (!jsonData) {
            console.error("Usage: node addEmployee.js '<json_string>'");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGODB_URI);
        const data = JSON.parse(jsonData);
        const created = await Employee.create(data);
        console.log("Successfully added employee:", created._id);
        process.exit(0);
    } catch (error) {
        console.error("Failed to add employee:", error);
        process.exit(1);
    }
}

main();
