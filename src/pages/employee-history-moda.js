import React, { useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import configuration from '../shared/config';
import { Table, TableBody, TableHead, TableCell, TableRow, Paper } from '@mui/material';

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

const EmployeeHistoryModal = ({ employeeId }) => {
  const [open, setOpen] = React.useState(false);
  const [employee, setEmployee] = React.useState({});
  const [error, setError] = React.useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${configuration().api_url}api/history/${employeeId}`, {
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
  }, [employeeId]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>History</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="employee-modal-title"
        aria-describedby="employee-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employee.map((history, index) => (
                <TableRow key={index}>
                  <TableCell>{history.action}</TableCell>
                  <TableCell>{history.user.name}</TableCell>
                  <TableCell>{history.created_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Modal>
    </React.Fragment>

  );
}
export default EmployeeHistoryModal;
