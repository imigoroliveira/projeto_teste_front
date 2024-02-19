import React from 'react';
import Layout from './components/layout/layout';
import Home from './pages/Home';
import Produtos from './pages/Produtos';

const App = () => {
  return (
    <>
      <Layout>
        <Home />
      </Layout>
      <Layout>
        <Produtos />
      </Layout>
    </>
  );
};

export default App;