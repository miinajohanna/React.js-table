import mongoose from 'mongoose';

const assignmentCollection = mongoose.Schema({
    employee_id: Number,
    project_code: Number,
    start_date: String
});

const Assignment = mongoose.model('Assignment', assignmentCollection);

export default Assignment;
