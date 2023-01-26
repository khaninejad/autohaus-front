import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(1),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Menu = () => {
  const classes = useStyles();
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
    <AppBar position="static" >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <HomeIcon />
        </IconButton>
        <Typography variant="h6">
          {isLoggedIn ? "Welcome" : "Please Login"}
        </Typography>
        <div style={{ flexGrow: 1 }} className={classes.navlinks} />
        {isLoggedIn ? (
          <>
            <Link className={classes.link} to="/home" >Home</Link>
            <Link className={classes.link} to="/list-employee">Employee List</Link>
            <Link className={classes.link} to="/list-department">Department List</Link>
            <Link className={classes.link} to="/signout">Sign out</Link>
          </>
        ) : (
          <>
            <Link className={classes.link} to="/">Home</Link>
            <Link className={classes.link} to="/signIn">SignIn</Link>
            <Link className={classes.link} to="/signUp">signup</Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
