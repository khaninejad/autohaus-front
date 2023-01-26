import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, MenuItem, FormControl, Grid, Paper, Alert } from '@mui/material';
import Menu from '../../elements/menu';
import configuration from '../../shared/config';
import { useNavigate, useParams } from 'react-router-dom';
import Select from "react-select";

const EditEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({ first_name: '', last_name: '', address: '', job_title: '', department: '', street: '', nr: '', plz: '', ort: '', land: '' });
    const [options, setOptions] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${configuration().api_url}api/employee/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setEmployee(res.data);
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
    }, [token, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`${configuration().api_url}api/employee/${id}`,
                employee,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setEmployee(res.data);
            navigate("/list-employee");
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
                    <form>
                        {error && <Alert severity="error">{error}</Alert>}
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Input required label="First Name" value={employee.first_name} onChange={e => setEmployee({ ...employee, first_name: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <Input required label="Last Name" value={employee.last_name} onChange={e => setEmployee({ ...employee, last_name: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <Input label="Street" value={employee.street} onChange={e => setEmployee({ ...employee, street: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <Input label="Nr" value={employee.nr} onChange={e => setEmployee({ ...employee, nr: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <Input label="PLZ" value={employee.plz} onChange={e => setEmployee({ ...employee, plz: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <Input label="Ort" value={employee.ort} onChange={e => setEmployee({ ...employee, ort: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <Input label="Land" value={employee.land} onChange={e => setEmployee({ ...employee, land: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <Input label="job_title" value={employee.job_title} onChange={e => setEmployee({ ...employee, job_title: e.target.value })} />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        options={options}
                                        value={options.find(option => option.value === employee.department)}
                                        onChange={(selectedOption) => setEmployee({ ...employee, department: selectedOption.value })}
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
                                <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>

            </Grid >

        </Paper >
    );
};

export default EditEmployee;
