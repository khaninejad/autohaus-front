import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './elements/menu';
import SignIn from './auth/sign-in';
import SignUp from './auth/sign-up';
import Home from './pages/home';
import AddEmployee from './pages/add-employee';
import EmployeeList from './pages/list-employee';

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
      <Route path="/list-employee" element={<EmployeeList />} />
     
    </Routes>
  </BrowserRouter>
</React.StrictMode>,
);
reportWebVitals();
