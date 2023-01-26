import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Grid, Paper, Alert } from '@mui/material';
import configuration from '../../shared/config';
import { useNavigate, useParams } from 'react-router-dom';
import Menu from '../../elements/menu';

const EditDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState({ name: '', description: '' });
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${configuration().api_url}api/department/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDepartment(res.data);
            } catch (err) {
                setError(err.response.data.message);
            }
        }
        fetchData();
    }, [token, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.patch(`${configuration().api_url}api/department/${id}`,
                department,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setDepartment(res.data);
            navigate("/list-department");
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
                                <Input label="Name" value={department.name} onChange={e => setDepartment({ ...department, name: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <Input label="Description" value={department.description} onChange={e => setDepartment({ ...department, description: e.target.value })} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>

            </Grid>

        </Paper>
    );
};

export default EditDepartment;
