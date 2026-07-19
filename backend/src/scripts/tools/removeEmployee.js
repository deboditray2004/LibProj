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
        const id = process.argv[2];
        if (!id) {
            console.error("Usage: node removeEmployee.js <mongodb_id>");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGODB_URI);
        const removed = await Employee.findByIdAndDelete(id);
        if (removed) {
            console.log("Successfully removed employee:", id);
        } else {
            console.log("Employee not found.");
        }
        process.exit(0);
    } catch (error) {
        console.error("Failed to remove employee:", error);
        process.exit(1);
    }
}

main();
