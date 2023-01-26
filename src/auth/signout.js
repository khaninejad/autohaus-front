import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Signout() {
    const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    navigate("/");
  }, [navigate]);

  return <p>Signing out...</p>;
}

export default Signout;