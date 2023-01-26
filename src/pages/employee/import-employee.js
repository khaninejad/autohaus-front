import React, { useState } from 'react';
import axios from 'axios';
import { Paper, Typography, Button, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import configuration from '../../shared/config';

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
            await axios.post(`${configuration().api_url}api/employee/import`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(err.response.data.message);
        }
    }

    return (
        <Paper>
            <Typography variant="h4" align="center">Upload CSV File</Typography>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <Input type="file" onChange={handleFileUpload} required />
                <Button type="submit">Upload</Button>
            </form>
        </Paper>
    );
};

export default ImportEmployees;  