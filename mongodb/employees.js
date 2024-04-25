import mongoose from 'mongoose';

const employeeCollection = mongoose.Schema({
    employee_id: {
        type: Number,
        unique: true
    },
    full_name: String,
    email: String,
    password: String
});

const Employee = mongoose.model('Employee', employeeCollection);

export default Employee;
