import React from 'react';
import { BrowserRouter as Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Produtos from './pages/Produtos';

const Routes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/produtos" element={<Produtos />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Routes;