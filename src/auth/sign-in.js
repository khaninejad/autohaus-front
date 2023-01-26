import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Grid, Alert } from '@mui/material';
import Menu from '../elements/menu';
import configuration from '../shared/config';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${configuration().api_url}api/signin`, { username, password });
      localStorage.setItem('token', res.data.access_token);
      navigate("/home");
    } catch (err) {
      setError("Invalid Email or Password");
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
        label="Email"
        type="email"
        value={username}
        onChange={e => setUsername(e.target.value)}
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
        variant="contained" color="primary"
      >
        Sign In
      </Button>
    </form>
    </Grid>

</Grid>

</Paper>
  );
};

export default SignIn;
