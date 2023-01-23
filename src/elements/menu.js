import React, { useState, useEffect } from 'react';
import { Link  } from "react-router-dom";

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
  if (isLoggedIn) {  
    return (
      <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/list-employee">List</Link>
        </li>
        <li>
          <Link to="/add-employee">Add</Link>
        </li>
      </ul>
    </nav>
      );
  }else {
    return (
      <nav>
      <ul>
      <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signIn">SignIn</Link>
        </li>
        <li>
          <Link to="/signUp">signup</Link>
        </li>
      </ul>
    </nav>
      );
  }
};

export default Menu;
