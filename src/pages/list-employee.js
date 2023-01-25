import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableCell, TableRow, Typography, Paper } from '@mui/material';
import Menu from '../elements/menu';
import configuration from '../shared/config';


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${configuration().api_url}api/employees`);
        setEmployees(res.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    }
    fetchData();
  }, []);

  return (
    <Paper>
      <Menu />
      <Typography variant="h4" align="center">Employee List</Typography>
      {error && <p>{error}</p>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Last Name</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Department</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {employees.map(employee => (
            <TableRow key={employee._id}>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>{employee.firstName}</TableCell>
              <TableCell>{employee.address}</TableCell>
              <TableCell>{employee.jobTitle}</TableCell>
              <TableCell>{employee.department}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
};

export default EmployeeList;
