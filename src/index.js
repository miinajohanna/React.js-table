import React, {Component} from 'react';
import { createRoot } from 'react-dom/client';
import axios from "axios";


class TableComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    fetchData = async () => {
        try {
            const tableData = [];

            const assignments_object = await axios.get('http://localhost:3000/');
            const assignments = assignments_object.data.assignments;
            assignments.reverse();

            for (let i = 0; i < 5; i++) {

                const employee_object = await axios.get(`http://localhost:3000/employees/${assignments[i].employee_id}`);
                const employee_name = employee_object.data.employees[0].full_name;

                const project_object = await axios.get(`http://localhost:3000/projects/${assignments[i].project_code}`);
                const project_name = project_object.data.projects[0].project_name;

                tableData.push({
                    employee_id: assignments[i].employee_id,
                    employee_name: employee_name,
                    project_name: project_name,
                    start_date: assignments[i].start_date
                });
            }

            this.setState({ data: tableData });

        } catch (error) {
            console.error('Error fetching table data:', error);
        }
    }
    
    componentDidMount() {
        this.fetchData();
        this.interval = setInterval(this.fetchData, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        const {data} = this.state;
        
        return (
            <table style={{border: "1px solid black"}}>
                <thead>
                    <tr>
                        <th style={{ padding: "8px" }}>Employee Id</th>
                        <th style={{ padding: "8px" }}>Employee Name</th>
                        <th style={{ padding: "8px" }}>Project Name</th>
                        <th style={{ padding: "8px" }}>Start Date</th>
                    </tr>
                </thead>
                <tbody>

                    {data.map(employee => (

                        <tr key={employee}>
                                <td style={{ padding: "8px" }}>{ employee.employee_id }</td>
                                <td style={{ padding: "8px" }}>{ employee.employee_name }</td>
                                <td style={{ padding: "8px" }}>{ employee.project_name }</td>
                                <td style={{ padding: "8px" }}>{ employee.start_date }</td>
                        </tr> 
                    ))}

                </tbody>
    
            </table>
        )
    }
}


const root = createRoot(document.getElementById("root"));

root.render(
    <>
        <h1>Project Data</h1>
        <br></br>
        <TableComponent />
    </>
);
