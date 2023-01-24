import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Table, TableHead, TableCell, TableRow, Typography, Paper } from '@mui/material';
import Menu from '../elements/menu';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await axios.get('http://localhost:4000/api/department', {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          setDepartments(res.data);
      } catch (err) {
          setError(err.response.data.message);
      }
  }
    fetchData();
  }, []);

  return (
    <Paper>
      <Menu />
      <Link to="/add-department">Add Department</Link>
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
