import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper } from '@mui/material';
import Menu from '../elements/menu';
import configuration from '../shared/config';

const AddDepartment = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(`${configuration().api_url}api/department`, { name, description }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if(res.data.success) {
        setName('');
        setDescription('');
        navigate("/list-department");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <Paper>
      <Menu />
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" align="center">Add Department</Typography>
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
         <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Add Department</Button>
        {error && <p>{error}</p>}
      </form>
    </Paper>
  );
};

export default AddDepartment;