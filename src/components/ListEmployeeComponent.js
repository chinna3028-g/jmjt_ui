import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    useEffect(() => {

        getAllEmployees();
    }, [])

    const getAllEmployees = () => {
        EmployeeService.getAllEmployees().then((response) => {
            setEmployees(response.data.employees)
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteEmployee = (employeeId) => {
        EmployeeService.deleteEmployee(employeeId).then((response) => {
            getAllEmployees();

        }).catch(error => {
            console.log(error);
        })

    }

    return (
        <div className="container">
            <br></br>
            <Link to="/add-employee" className="btn btn-primary mb-2" > Add Employee </Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th> Employee Name </th>
                        <th> Employee DOB </th>
                        <th> Employee Designation </th>
                        <th> Employee Salary </th>
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(
                            employee =>
                                <tr key={employee.id}>
                                    <td> {employee.employeeName} </td>
                                    <td>{employee.employeeDOB}</td>
                                    <td>{employee.employeeDesignation}</td>
                                    <td>{employee.employeeSalary}</td>
                                    <td>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="col-md-06">
                                                    <Link to={`/edit-employee/${employee.id}`} >
                                                        <BsPencilSquare></BsPencilSquare>
                                                    </Link>
                                                </div>
                                                <div className="col-md-06">
                                                    <BsFillTrashFill onClick={() => deleteEmployee(employee.id)} > </BsFillTrashFill>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent
