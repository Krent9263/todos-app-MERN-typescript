import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../view/Login';
import Home from '../view/Home';
import Members from '../view/Members';
import Register from '../view/Register';


const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes encapsulated in Layout */}
        <Route >
          <Route path="/home" element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Fallback */}
        {/* <Route path="*" element={<Navigate to={RoutePath.ROOT} replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;



