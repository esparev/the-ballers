import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Home from '../containers/Home.jsx';
import News from '../containers/News.jsx';
import SingleNews from '../containers/SingleNews.jsx';
import Tournaments from '../containers/Tournaments.jsx';
import Tournament from '../containers/Tournament.jsx';
import Leagues from '../containers/Leagues.jsx';
import LeagueTeams from '../containers/LeagueTeams.jsx';
import TeamPlayers from '../containers/TeamPlayers.jsx';
import Admins from '../containers/Admins.jsx';

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
          <Route exact path='/ligas' component={Leagues} />
          <Route exact path='/ligas/liga' component={LeagueTeams} />
          <Route exact path='/ligas/liga/equipo' component={TeamPlayers} />
          <Route exact path='/admins' component={Admins} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
