import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../containers/Home.jsx';
import News from '../containers/News.jsx';
import Tournaments from '../containers/Tournaments.jsx';
import Layout from '../components/Layout.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/noticias' element={<News title='Noticia' />} />
          <Route path='/torneos' element={<Tournaments title='Torneo' />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
