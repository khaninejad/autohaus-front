import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Grid, Alert } from '@mui/material';
import Menu from '../../elements/menu';
import configuration from '../../shared/config';

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
      if (res) {
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
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '50vh' }}
      >

        <Grid item xs={3}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" align="left">Add Department</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  required="true"
                  label="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">Add Department</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>

      </Grid>

    </Paper>
  );
};

export default AddDepartment;