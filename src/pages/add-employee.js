import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Paper } from '@mui/material';
import Menu from '../elements/menu';

const AddEmployee = (props) => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/employees', {
        lastName,
        firstName,
        address,
        jobTitle,
        department
      });
      if (res.data.success) {
        navigate("/home");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <Paper>
    <Menu />
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            label="Last Name"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="First Name"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="text"
            placeholder="Department"
            value={department}
            onChange={e => setDepartment(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary">Add Employee</Button>
          {error && <p>{error}</p>}
        </Grid>
      </Grid>
    </form>
    </Paper>
  );
};

export default AddEmployee;
