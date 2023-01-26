import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button } from '@mui/material';
import configuration from '../../shared/config';
import { useNavigate, useParams } from 'react-router-dom';

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
        <form>
            {error && <p>{error}</p>}
            <Input label="Name" value={department.name} onChange={e => setDepartment({ ...department, name: e.target.value })} />
            <Input label="Description" value={department.description} onChange={e => setDepartment({ ...department, description: e.target.value })} />
            <Button onClick={handleSubmit}>Save</Button>
        </form>
    );
};

export default EditDepartment;
