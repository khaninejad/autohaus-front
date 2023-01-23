import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableCell, TableRow, Typography, Paper } from '@mui/material';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/departments');
        setDepartments(res.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    }
    fetchData();
  }, []);

  return (
    <Paper>
      <Typography variant="h4" align="center">Department List</Typography>
      {error && <p>{error}</p>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {departments.map(department => (
            <TableRow key={department._id}>
              <TableCell>{department.name}</TableCell>
              <TableCell>{department.description}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
};

export default DepartmentList;
