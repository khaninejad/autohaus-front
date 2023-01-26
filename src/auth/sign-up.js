import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Grid, Alert } from '@mui/material';
import Menu from '../elements/menu';
import configuration from '../shared/config';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${configuration().api_url}api/signup`, { name, email, password });
      navigate("/signin");
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
    {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Name"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        margin="normal"
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Sign Up
      </Button>
      {error && <p>{error}</p>}
    </form>
    </Grid>

</Grid>

</Paper>
  );
};
export default SignUp;
