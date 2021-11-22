import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../containers/Home.jsx';
import Layout from '../components/Layout.jsx';

const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route exact path='/' element={Home} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
