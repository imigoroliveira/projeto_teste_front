import React from 'react';
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/produtos' element={<Produtos />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
