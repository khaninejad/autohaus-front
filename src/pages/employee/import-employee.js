import React, { useState } from 'react';
import axios from 'axios';
import { Paper, Typography, Button, Input, Alert, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import configuration from '../../shared/config';
import Menu from '../../elements/menu';

const ImportEmployees = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post(`${configuration().api_url}api/employee/import`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res) {
                navigate("/list-employee");
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
                style={{ minHeight: '100vh' }}
            >

                <Grid item xs={3}>

                    <Typography variant="h4" align="center">Upload CSV File</Typography>
                    <form onSubmit={handleSubmit}>
                        {error && <Alert severity="error">{error}</Alert>}
                        <Input type="file" onChange={handleFileUpload} required />
                        <Button type="submit">Upload</Button>
                    </form>
                </Grid>
            </Grid>

        </Paper>
    );
};

export default ImportEmployees;  