import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const AddEmployeeComponent = () => {

    const [employeeName, setEmployeeName] = useState('');
    const [employeeDOB, setEmployeeDOB] = useState('');
    const [employeeDesignation, setEmployeeDesignation] = useState('');
    const [employeeSalary, setEmployeeSalary] = useState('');
    const history = useHistory();
    const { id } = useParams();

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        const employee = { employeeName, employeeDOB, employeeDesignation, employeeSalary }

        if (id) {
            EmployeeService.updateEmployee(id, employee).then((response) => {
                history.push('/')
            }).catch(error => {
                console.log(error)
            })

        } else {
            EmployeeService.createEmployee(employee).then((response) => {
                history.push('/');
            }).catch(error => {
                console.log(error)
            })
        }

    }

    useEffect(() => {
        console.log(id)
        if (id) {
            EmployeeService.getEmployeeById(id).then((response) => {
                setEmployeeName(response.data.employeeName)
                const [dateString] = new Date(response.data.employeeDOB).toISOString().split("T");
                const [year, month, date] = dateString.split("-");
                setEmployeeDOB(`${year}-${month}-${date}`)
                setEmployeeDesignation(response.data.employeeDesignation)
                setEmployeeSalary(response.data.employeeSalary)
            }).catch(error => {
                console.log(error)
            })
        }
    }, [])

    const title = () => {

        if (id) {
            return <h2 className="text-center">Update Employee</h2>
        } else {
            return <h2 className="text-center">Add Employee</h2>
        }
    }

    return (
        <div>
            <br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-4 offset-md-4">
                        {
                            title()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label"> Name :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Employee name"
                                        name="employeeName"
                                        className="form-control"
                                        value={employeeName}
                                        onChange={(e) => setEmployeeName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Date Of Birth</label>
                                    <input
                                        type="date"
                                        placeholder="Enter Date Of Birth"
                                        name="employeeDOB"
                                        className="form-control"
                                        value={employeeDOB}
                                        onChange={(e) => setEmployeeDOB(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Employee Designation :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Employee Designation"
                                        name="employeeDesignation"
                                        className="form-control"
                                        value={employeeDesignation}
                                        onChange={(e) => setEmployeeDesignation(e.target.value)}
                                    >
                                    </input>``
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label"> Employee Salary :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Employee Salary"
                                        name="employeeSalary"
                                        className="form-control"
                                        value={employeeSalary}
                                        onChange={(e) => setEmployeeSalary(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <button className="btn btn-success" onClick={(e) => saveOrUpdateEmployee(e)} >Submit </button>
                                <Link to="/employees" className="btn btn-danger"> Cancel </Link>
                            </form>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AddEmployeeComponent
