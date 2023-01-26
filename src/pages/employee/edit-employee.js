import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, MenuItem, FormControl } from '@mui/material';
import configuration from '../../shared/config';
import { useNavigate, useParams } from 'react-router-dom';
import Select from "react-select";

const EditEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({ first_name: '', last_name: '', address: '', job_title: '', department: '' });
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
        <form>
            {error && <p>{error}</p>}
            <Input label="First Name" value={employee.first_name} onChange={e => setEmployee({ ...employee, first_name: e.target.value })} />
            <Input label="Last Name" value={employee.last_name} onChange={e => setEmployee({ ...employee, last_name: e.target.value })} />
            <Input label="Address" value={employee.address} onChange={e => setEmployee({ ...employee, address: e.target.value })} />
            <Input label="job_title" value={employee.job_title} onChange={e => setEmployee({ ...employee, job_title: e.target.value })} />
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
            <Button onClick={handleSubmit}>Save</Button>
        </form>
    );
};

export default EditEmployee;
