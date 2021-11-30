import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Home from '../containers/Home.jsx';
import News from '../containers/News.jsx';
import SingleNews from '../containers/SingleNews.jsx';
import CreateNews from '../containers/CreateNews.jsx';
import Tournaments from '../containers/Tournaments.jsx';
import Tournament from '../containers/Tournament.jsx';
import CreateTournament from '../containers/CreateTournament.jsx';
import Leagues from '../containers/Leagues.jsx';
import LeagueTeams from '../containers/LeagueTeams.jsx';
import TeamPlayers from '../containers/TeamPlayers.jsx';
import CreatePlayer from '../containers/CreatePlayer.jsx';
import PlayerContainer from '../containers/Player.jsx';
import CoachContainer from '../containers/Coach.jsx';
import Admins from '../containers/Admins.jsx';
import AdminContainer from '../containers/Admin.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route exact path='/noticias' component={News} />
          <Route exact path='/noticias/noticia' component={SingleNews} />
          <Route exact path='/noticias/nueva-noticia' component={CreateNews} />
          <Route exact path='/torneos' component={Tournaments} />
          <Route exact path='/torneos/torneo' component={Tournament} />
          <Route exact path='/torneos/nuevo-torneo' component={CreateTournament} />
          <Route exact path='/ligas' component={Leagues} />
          <Route exact path='/ligas/liga' component={LeagueTeams} />
          <Route exact path='/ligas/liga/equipo' component={TeamPlayers} />
          <Route exact path='/ligas/liga/equipo/nuevo-jugador' component={CreatePlayer} />
          <Route exact path='/ligas/liga/equipo/jugador' component={PlayerContainer} />
          <Route exact path='/ligas/liga/equipo/entrenador' component={CoachContainer} />
          <Route exact path='/admins' component={Admins} />
          <Route exact path='/admins/admin' component={AdminContainer} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
