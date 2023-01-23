import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = (props) => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [address, setAddress] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/employees', { 
        lastName, 
        firstName, 
        address, 
        jobTitle, 
        department 
      });
      if(res.data.success) {
        navigate("/home");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={e => setJobTitle(e.target.value)}
      />
<input
  type="text"
  placeholder="Department"
  value={department}
  onChange={e => setDepartment(e.target.value)}
/>
<button type="submit">Add Employee</button>
{error && <p>{error}</p>}
</form>
);
};

export default AddEmployee;
