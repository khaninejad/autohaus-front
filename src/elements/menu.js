import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Menu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <HomeIcon />
        </IconButton>
        <Typography variant="h6">
          {isLoggedIn ? "Welcome" : "Please Login"}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        {isLoggedIn ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/list-employee">Employee List</Link>
            <Link to="/add-employee">Add Employee</Link>
            <Link to="/list-department">Department List</Link>
            <Link to="/add-department">Add Department</Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/signIn">SignIn</Link>
            <Link to="/signUp">signup</Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
