import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Table, TableHead, TableCell, TableRow, Typography, Paper, MenuItem, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Menu from '../../elements/menu';
import Select from "react-select";
import EmployeeModal from './employee-modal';
import EmployeeHistoryModal from './employee-history-modal';
import configuration from '../../shared/config';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '0px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');
  const [options, setOptions] = useState([]);
  const [department, setDepartment] = useState('');
  const token = localStorage.getItem('token');

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`${configuration().api_url}api/employee/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setEmployees(employees.filter(item => item._id !== id));
      } catch (err) {
        console.error(err);
        setError(err.response.data.message);
      }
    }
  }
  const handleEdit = (employee) => {
    return (
      <div>
        <Link to={{
          pathname: `/edit-employee/${employee}`,
          state: { employee }
        }}>Edit</Link>
      </div>
    );
  }

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
        setOptions(res.data.map(department => ({ value: department._id, label: department.name })));
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
      <br />
      <Box sx={{ flexGrow: 1, }}>
        <Grid container spacing={2}>
          <Grid xs={2}>
            <Item><Link to="/add-employee"> <Button variant="contained" color="primary">
              Add Employee
            </Button></Link></Item>
          </Grid>
          <Grid xs={2}>
            <Item><Link to="/import-employees"><Button variant="contained" color="primary">
              Import Employee
            </Button></Link></Item>
          </Grid>
          <Grid xs={3}>
            <Item><Select
              variant="contained"
              options={options}
              onChange={(selectedOption) => setDepartment(selectedOption.value)}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select></Item>
          </Grid>
        </Grid>
      </Box>

      {error && <p>{error}</p>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Last Name</TableCell>
            <TableCell>First Name</TableCell>
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
              <TableCell>{employee.job_title}</TableCell>
              <TableCell>{employee.department?.name}</TableCell>
              <TableCell><EmployeeModal employeeId={employee._id} />
                <EmployeeHistoryModal employeeId={employee._id} />
                {handleEdit(employee._id)}
                <Button onClick={() => handleDelete(employee._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
};

export default EmployeeList;
