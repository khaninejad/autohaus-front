import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableCell, TableRow, Typography, Paper } from '@mui/material';
import Menu from '../elements/menu';
import configuration from '../shared/config';


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${configuration().api_url}api/employee`, {
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
              <TableCell>{employee.last_name}</TableCell>
              <TableCell>{employee.first_name}</TableCell>
              <TableCell>{employee.address}</TableCell>
              <TableCell>{employee.job_title}</TableCell>
              <TableCell>{employee.department?.name}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
};

export default EmployeeList;
