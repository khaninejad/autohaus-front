import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper } from '@mui/material';

const AddDepartment = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/departments', { name });
      if(res.data.success) {
        setName('');
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <Paper>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" align="center">Add Department</Typography>
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Add Department</Button>
        {error && <p>{error}</p>}
      </form>
    </Paper>
  );
};

export default AddDepartment;