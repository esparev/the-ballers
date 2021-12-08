import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Home from '../containers/Home.jsx';
import News from '../containers/News.jsx';
import SingleNews from '../containers/SingleNews.jsx';
import CreateNews from '../containers/CreateNews.jsx';
import EditNews from '../containers/EditNews.jsx';
import Tournaments from '../containers/Tournaments.jsx';
import Tournament from '../containers/Tournament.jsx';
import CreateTournament from '../containers/CreateTournament.jsx';
import EditTournament from '../containers/EditTournament.jsx';
import Leagues from '../containers/Leagues.jsx';
import LeagueTeams from '../containers/LeagueTeams.jsx';
import CreateLeague from '../containers/CreateLeague.jsx';
import EditLeague from '../containers/EditLeague.jsx';
import TeamPlayers from '../containers/TeamPlayers.jsx';
import CreateTeam from '../containers/CreateTeam.jsx';
import EditTeam from '../containers/EditTeam.jsx';
import CreatePlayer from '../containers/CreatePlayer.jsx';
import EditPlayer from '../containers/EditPlayer.jsx';
import CreateCoach from '../containers/CreateCoach.jsx';
import EditCoach from '../containers/EditCoach.jsx';
import PlayerContainer from '../containers/Player.jsx';
import CoachContainer from '../containers/Coach.jsx';
import Admins from '../containers/Admins.jsx';
import AdminContainer from '../containers/Admin.jsx';
import CreateAdmin from '../containers/CreateAdmin.jsx';
import EditAdmin from '../containers/EditAdmin.jsx';
import About from '../containers/About.jsx';
import Login from '../containers/Login.jsx';
import Recovery from '../containers/Recovery.jsx';
import SendMail from '../containers/SendMail.jsx';
import ChangePassword from '../containers/ChangePassword.jsx';
import NotFound from '../containers/NotFound.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* News routes */}
          <Route exact path='/noticias' component={News} />
          <Route exact path='/noticias/noticia' component={SingleNews} />
          <Route exact path='/noticias/nueva-noticia' component={CreateNews} />
          <Route exact path='/noticias/noticia/editar-noticia' component={EditNews} />
          {/* Tournaments routes */}
          <Route exact path='/torneos' component={Tournaments} />
          <Route exact path='/torneos/torneo' component={Tournament} />
          <Route exact path='/torneos/nuevo-torneo' component={CreateTournament} />
          <Route exact path='/torneos/torneo/editar-torneo' component={EditTournament} />
          {/* Leagues routes */}
          <Route exact path='/ligas' component={Leagues} />
          <Route exact path='/ligas/liga' component={LeagueTeams} />
          <Route exact path='/ligas/nueva-liga' component={CreateLeague} />
          <Route exact path='/ligas/liga/editar-liga' component={EditLeague} />
          {/* Teams routes */}
          <Route exact path='/ligas/liga/equipo' component={TeamPlayers} />
          <Route exact path='/ligas/liga/nuevo-equipo' component={CreateTeam} />
          <Route exact path='/ligas/liga/equipo/editar-equipo' component={EditTeam} />
          {/* Player routes */}
          <Route exact path='/ligas/liga/equipo/jugador' component={PlayerContainer} />
          <Route exact path='/ligas/liga/equipo/nuevo-jugador' component={CreatePlayer} />
          <Route exact path='/ligas/liga/equipo/jugador/editar-jugador' component={EditPlayer} />
          {/* Coach routes */}
          <Route exact path='/ligas/liga/equipo/entrenador' component={CoachContainer} />
          <Route exact path='/ligas/liga/equipo/nuevo-entrenador' component={CreateCoach} />
          <Route exact path='/ligas/liga/equipo/entrenador/editar-entrenador' component={EditCoach} />
          {/* Admins routes */}
          <Route exact path='/admins' component={Admins} />
          <Route exact path='/admins/admin' component={AdminContainer} />
          <Route exact path='/admins/nuevo-admin' component={CreateAdmin} />
          <Route exact path='/admins/admin/editar-admin' component={EditAdmin} />
          {/* Other routes */}
          {/* <Route exact path='/perfil' component={Profile} /> */}
          <Route exact path='/conocenos' component={About} />
          {/* <Route exact path='/unete' component={JoinLeague} /> */}
          <Route exact path='/iniciar-sesion' component={Login} />
          <Route exact path='/recuperar-contraseña' component={Recovery} />
          <Route exact path='/enviar-correo' component={SendMail} />
          <Route exact path='/cambiar-contraseña' component={ChangePassword} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
