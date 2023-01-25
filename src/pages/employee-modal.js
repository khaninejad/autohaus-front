import React, { useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import configuration from '../shared/config';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

const EmployeeModal = ({ employeeId }) => {
  const [open, setOpen] = React.useState(false);
  const [employee, setEmployee] = React.useState({});
  const [error, setError] = React.useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${configuration().api_url}api/employee/${employeeId}`, {
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
  }, [employeeId, token]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <td><Button onClick={handleOpen}>Detail</Button></td>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="employee-modal-title"
        aria-describedby="employee-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="employee-modal-title">{employee.first_name} {employee.last_name}</h2>
          {error && <p>{error}</p>}
          <p id="employee-modal-description">
            Address: {employee.address}
            <br />
            Job Title: {employee.job_title}
            <br />
            Department: {employee.department?.name}
          </p>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default EmployeeModal;
