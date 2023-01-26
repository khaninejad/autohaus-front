import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Paper, FormControl, MenuItem, Alert, Typography } from '@mui/material';
import Select from "react-select";
import Menu from '../../elements/menu';
import configuration from '../../shared/config';

const AddEmployee = (props) => {
  const [last_name, setLastName] = useState('');
  const [first_name, setFirstName] = useState('');
  const [job_title, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [street, setStreet] = useState('');
  const [nr, setNr] = useState('');
  const [plz, setPlz] = useState('');
  const [ort, setOrt] = useState('');
  const [land, setLand] = useState('');
  const [error, setError] = useState('');
  const [options, setOptions] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
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
        setError(err.response.data.message);
      }
    }
    fetchOptions();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(`${configuration().api_url}api/employee/`, {
        last_name,
        first_name,
        street,
        nr,
        plz,
        ort,
        land,
        job_title,
        department
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
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
                  label="Last Name"
                  placeholder="Last Name"
                  value={last_name}
                  onChange={e => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required="true"
                  label="First Name"
                  placeholder="First Name"
                  value={first_name}
                  onChange={e => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Street"
                  placeholder="Street"
                  value={street}
                  onChange={e => setStreet(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Nr"
                  placeholder="Nr"
                  value={nr}
                  onChange={e => setNr(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="PLZ"
                  placeholder="PLZ"
                  value={plz}
                  onChange={e => setPlz(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Ort"
                  placeholder="Ort"
                  value={ort}
                  onChange={e => setOrt(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Land"
                  placeholder="Land"
                  value={land}
                  onChange={e => setLand(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  placeholder="Job Title"
                  value={job_title}
                  onChange={e => setJobTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    options={options}
                    onChange={(selectedOption) => setDepartment(selectedOption.value)}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary">Add Employee</Button>

              </Grid>
            </Grid>
          </form>
        </Grid>

      </Grid>

    </Paper>
  );
};

export default AddEmployee;
