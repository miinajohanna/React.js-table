import express from 'express';
import dotenv from 'dotenv';
import connection from './mongodb/connection.js';
import Employee from './mongodb/employees.js';
import Assignment from './mongodb/assignments.js';
import Project from './mongodb/projects.js';
import mongoose from 'mongoose';
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended:true }));
const PORT = process.env.PORT || 3000;

// establish connection to the database
connection();

app.use(cors());
app.use(express.json());


app.get('/', async(req, res) => {
    const assignments = await Assignment.find();
    res.status(200).json({assignments});
});

app.get('/employees/:employee_id', async(req, res) => {
    const employees = await Employee.find({ employee_id: req.params.employee_id });
    res.status(200).json({employees});
});

app.get('/projects/:project_code', async(req, res) => {
    const projects = await Project.find({ project_code: req.params.project_code });
    res.status(200).json({projects});
});

// add new entries to the database

app.post('/api/employees', (req, res) => {
    
    const data = new Employee(
        {
            employee_id: req.body.employee_id,
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password
        }
    );

    data.save()
    .then(employee => {
        res.status(201).json({ success:true, employee });
    })
    .catch(error => {
        console.log("Error saving a new employee", error);
        res.status(409).json({ error: error.message });
    });

});

app.post('/api/projects', (req, res) => {

    const data = new Project(
        {
            project_code: req.body.project_code,
            project_name: req.body.project_name,
            project_description: req.body.project_description
        }
    );

    data.save()
    .then(project => {
        res.status(201).json({ success:true, project });
    })
    .catch(error => {
        console.log("Error saving a new project", error);
        res.status(409).json({ error: error.message });
    });
});

app.post('/api/project_assignments', (req, res) => {

    const data = new Assignment(
        {
            employee_id: req.body.employee_id,
            project_code: req.body.project_code,
            start_date: req.body.start_date
        }
    );

    data.save()
    .then(assignment => {
        res.status(201).json({ success:true, assignment });
    })
    .catch(error => {
        console.log("Error saving a new assignment", error);
        res.status(409).json({ error: error.message });
    });
});



app.use(express.static("dist"));


app.listen(PORT, () => { console.log("Listening on port " + PORT) });

