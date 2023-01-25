import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Table, TableHead, TableCell, TableRow, Typography, Paper, FormControl, MenuItem } from '@mui/material';
import Menu from '../elements/menu';
import Select from "react-select";
import EmployeeModal from './employee-modal';
import EmployeeHistoryModal from './employee-history-moda';
import configuration from '../shared/config';


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [options, setOptions] = useState([]);
  const [department, setDepartment] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    let apiUrl = `${configuration().api_url}api/employee`;
    if (department) {
        apiUrl = `${configuration().api_url}api/employee?department=${department}`;
    }
    const fetchData = async () => {
      try {
        const res = await axios.get(apiUrl, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
        setEmployees(res.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    }
    fetchData();

    const fetchOptions = async () => {
      try {
        const res = await axios.get(`${configuration().api_url}api/department`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      console.log(res);
        setOptions(res.data.map(department => ({value: department._id, label: department.name})));
      } catch (err) {
        console.log(err);
      }
    }
    fetchOptions();
  }, [department, token]);

  return (
    <Paper>
      <Menu />
      <Typography variant="h4" align="center">Employee List</Typography>
      <Link to="/add-employee">Add Employee</Link>
      <Link to="/import-employees">Import Employee</Link>
      <FormControl fullWidth> 
        <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      options={options}
      onChange={(selectedOption) => setDepartment(selectedOption.value)}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
        </FormControl>
      {error && <p>{error}</p>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Last Name</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {employees.map(employee => (
            <TableRow key={employee._id}>
              <TableCell>{employee.last_name}</TableCell>
              <TableCell>{employee.first_name}</TableCell>
              <TableCell>{employee.address}</TableCell>
              <TableCell>{employee.job_title}</TableCell>
              <TableCell>{employee.department?.name}</TableCell>
              <EmployeeModal employeeId={employee._id} />
              <EmployeeHistoryModal employeeId={employee._id} />
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
};

export default EmployeeList;
