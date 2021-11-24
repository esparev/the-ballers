import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../containers/Home.jsx';
import News from '../containers/News.jsx';
import SingleNews from '../containers/SingleNews.jsx';
import Tournaments from '../containers/Tournaments.jsx';
import Tournament from '../containers/Tournament.jsx';
import Layout from '../components/Layout.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route exact path='/noticias' component={News} />
          <Route exact path='/noticias/noticia' component={SingleNews} />
          <Route exact path='/torneos' component={Tournaments} />
          <Route exact path='/torneos/torneo' component={Tournament} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
