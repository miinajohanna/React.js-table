import mongoose from 'mongoose';

const projectCollection = mongoose.Schema({
    project_code: {
        type: Number,
        unique: true
    },
    project_name: String,
    project_description: String
});

const Project = mongoose.model('Project', projectCollection);

export default Project;
