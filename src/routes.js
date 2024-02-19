import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const AppRoutes = () => (
  <Routes>
    <Route path="/home" element={<Home/>} />
    <Route  Component={<NotFound/>} />

  </Routes>
);

export default AppRoutes;