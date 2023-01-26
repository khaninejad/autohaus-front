import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Table, TableHead, TableCell, TableRow, Typography, Paper } from '@mui/material';
import Menu from '../../elements/menu';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import configuration from '../../shared/config';
import Stack from '@mui/material/Stack';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await axios.delete(`${configuration().api_url}api/department/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setDepartments(departments.filter(department => department._id !== id));
      } catch (err) {
        console.error(err);
        setError(err.response.data.message);
      }
    }
  }
  const handleEdit = (department) => {
    return (
      <div>
        <Link to={{
          pathname: `/edit-department/${department}`,
          state: { department }
        }}><IconButton color="secondary" aria-label="edit">
            <EditIcon />
          </IconButton></Link>
      </div>
    );
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${configuration().api_url}api/department`, {
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
  }, [token]);

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
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {departments.map(department => (
            <TableRow key={department._id}>
              <TableCell>{department.name}</TableCell>
              <TableCell>{department.description}</TableCell>
              <TableCell>
              <Stack direction="row" spacing={1}>
                <IconButton aria-label="delete" onClick={() => handleDelete(department._id)}>
                  <DeleteIcon />
                </IconButton>
                {handleEdit(department._id)}
                </Stack>
              </TableCell>
            </TableRow>

          ))}
        </tbody>
      </Table>
    </Paper>
  );
};

export default DepartmentList;
