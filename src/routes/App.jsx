import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../containers/Home';
import News from '../containers/News';
import SingleNews from '../containers/SingleNews';
import CreateNews from '../containers/CreateNews';
import EditNews from '../containers/EditNews';
import Tournaments from '../containers/Tournaments';
import Tournament from '../containers/Tournament';
import CreateTournament from '../containers/CreateTournament';
import EditTournament from '../containers/EditTournament';
import Leagues from '../containers/Leagues';
import LeagueTeams from '../containers/LeagueTeams';
import CreateLeague from '../containers/CreateLeague';
import EditLeague from '../containers/EditLeague';
import TeamPlayers from '../containers/TeamPlayers';
import CreateTeam from '../containers/CreateTeam';
import EditTeam from '../containers/EditTeam';
import CreatePlayer from '../containers/CreatePlayer';
import EditPlayer from '../containers/EditPlayer';
import CreateCoach from '../containers/CreateCoach';
import EditCoach from '../containers/EditCoach';
import PlayerContainer from '../containers/Player';
import CoachContainer from '../containers/Coach';
import Admins from '../containers/Admins';
import AdminContainer from '../containers/Admin';
import CreateAdmin from '../containers/CreateAdmin';
import EditAdmin from '../containers/EditAdmin';
import About from '../containers/About';
import Login from '../containers/Login';
import Recovery from '../containers/Recovery';
import SendMail from '../containers/SendMail';
import ChangePassword from '../containers/ChangePassword';
import NotFound from '../containers/NotFound';

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
          <Route exact path='/ligas/liga/:id' component={LeagueTeams} />
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
