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

const App = ({ isLogged }) => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* News routes */}
          <Route exact path='/noticias' component={News} />
          <Route exact path='/noticias/:id' component={SingleNews} />
          <Route exact path='/noticias/nueva-noticia' component={isLogged ? CreateNews : Login} />
          <Route exact path='/noticias/:id/editar-noticia' component={isLogged ? EditNews : Login} />
          {/* Tournaments routes */}
          <Route exact path='/torneos' component={Tournaments} />
          <Route exact path='/torneos/:id' component={Tournament} />
          <Route exact path='/torneos/nuevo-torneo' component={isLogged ? CreateTournament : Login} />
          <Route exact path='/torneos/:id/editar-torneo' component={isLogged ? EditTournament : Login} />
          {/* Leagues routes */}
          <Route exact path='/ligas' component={Leagues} />
          <Route exact path='/ligas/:id' component={LeagueTeams} />
          <Route exact path='/ligas/nueva-liga' component={isLogged ? CreateLeague : Login} />
          <Route exact path='/ligas/:id/editar-liga' component={isLogged ? EditLeague : Login} />
          {/* Teams routes */}
          <Route exact path='/ligas/:ligaId/equipo/:equipoId' component={TeamPlayers} />
          <Route exact path='/ligas/:id/nuevo-equipo' component={isLogged ? CreateTeam : Login} />
          <Route exact path='/ligas/:ligaId/equipo/:equipoId/editar-equipo' component={isLogged ? EditTeam : Login} />
          {/* Player routes */}
          <Route exact path='/ligas/:ligaId/equipo/:equipoId/:jugadorId' component={PlayerContainer} />
          <Route exact path='/ligas/:ligaId/equipo/:equipoId/nuevo-jugador' component={isLogged ? CreatePlayer : Login} />
          <Route exact path='/ligas/:ligaId/equipo/:equipoId/:jugadorId/editar-jugador' component={isLogged ? EditPlayer : Login} />
          {/* Coach routes */}
          <Route exact path='/ligas/:ligaId/equipo/:equipoId/:entrenadorId' component={CoachContainer} />
          <Route exact path='/ligas/:ligaId/equipo/:equipoId/nuevo-entrenador' component={isLogged ? CreateCoach : Login} />
          <Route exact path='/ligas/:ligaId/equipo/:equipoId/:entrenadorId/editar-entrenador' component={isLogged ? EditCoach : Login} />
          {/* Admins routes */}
          <Route exact path='/admins' component={isLogged ? Admins : Login} />
          <Route exact path='/admins/:id' component={isLogged ? AdminContainer : Login} />
          <Route exact path='/admins/nuevo-admin' component={isLogged ? CreateAdmin : Login} />
          <Route exact path='/admins/:id/editar-admin' component={isLogged ? EditAdmin : Login} />
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
