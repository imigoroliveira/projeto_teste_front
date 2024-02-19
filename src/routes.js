import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import Home from './pages/Home';
import Produtos from './pages/Produtos';

const Routes = () => {
  return (
    <>
      <Route exact path="/">
        <Layout>
          <Home />
        </Layout>
      </Route>
      <Route path="/produtos">
        <Layout>
          <Produtos />
        </Layout>
      </Route>
    </>
  );
};

export default Routes;
