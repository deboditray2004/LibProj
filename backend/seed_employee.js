import 'dotenv/config';
import connectDB from './src/db/index.js';
import { Employee } from './src/models/employee.model.js';

const seed = async () => {
  try {
    await connectDB();
    const existing = await Employee.findOne({ empId: 'EMP001' });
    if (!existing) {
      await Employee.create({ name: 'Admin', email: 'admin@lib.com', empId: 'EMP001', password: 'password123' });
      console.log('Employee EMP001 created');
    } else {
      console.log('Employee EMP001 exists');
    }
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
};

seed();
