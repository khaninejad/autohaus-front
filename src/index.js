import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './elements/menu';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Home from './pages/home';
import AddEmployee from './pages/add-employee';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Menu /> }> </Route>
      <Route path="/home" element={<Home />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/add-employee" element={<AddEmployee />} />
     
    </Routes>
  </BrowserRouter>
</React.StrictMode>,
);
reportWebVitals();
