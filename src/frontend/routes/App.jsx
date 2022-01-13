import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import Layout from '@components/Layout';
import Home from '@containers/Home';
import News from '@containers/News';
import SingleNews from '@containers/SingleNews';
import CreateNews from '@containers/CreateNews';
import EditNews from '@containers/EditNews';
import Tournaments from '@containers/Tournaments';
import Tournament from '@containers/Tournament';
import CreateTournament from '@containers/CreateTournament';
import EditTournament from '@containers/EditTournament';
import Leagues from '@containers/Leagues';
import LeagueTeams from '@containers/LeagueTeams';
import CreateLeague from '@containers/CreateLeague';
import EditLeague from '@containers/EditLeague';
import TeamPlayers from '@containers/TeamPlayers';
import CreateTeam from '@containers/CreateTeam';
import EditTeam from '@containers/EditTeam';
import CreatePlayer from '@containers/CreatePlayer';
import EditPlayer from '@containers/EditPlayer';
import CreateCoach from '@containers/CreateCoach';
import EditCoach from '@containers/EditCoach';
import PlayerContainer from '@containers/Player';
import CoachContainer from '@containers/Coach';
import Admins from '@containers/Admins';
import AdminContainer from '@containers/Admin';
import CreateAdmin from '@containers/CreateAdmin';
import EditAdmin from '@containers/EditAdmin';
import Profile from '@containers/Profile';
import About from '@containers/About';
import Login from '@containers/Login';
import Recovery from '@containers/Recovery';
import SendMail from '@containers/SendMail';
import ChangePassword from '@containers/ChangePassword';
import NotFound from '@containers/NotFound';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the entire client side routing for the
 * react app with hash router and switch to achieve
 * consistency between the URL route and the component
 * the user is seeing as well with the consistency of
 * both the header and footer for every component
 * @param {*} param0 - data to verify the login status of an admin
 * @returns routing for the entire react app
 */
const App = ({ isLogged }) => {
  return (
    <HashRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* News routes */}
          <Route exact path='/noticias' component={News} />
          <Route exact path='/noticias/:slug' component={SingleNews} />
          <Route exact path='/noticias/nueva-noticia' component={isLogged ? CreateNews : NotFound} />
          <Route exact path='/noticias/:slug/editar-noticia' component={isLogged ? EditNews : NotFound} />
          {/* Tournaments routes */}
          <Route exact path='/torneos' component={Tournaments} />
          <Route exact path='/torneos/:slug' component={Tournament} />
          <Route exact path='/torneos/nuevo-torneo' component={isLogged ? CreateTournament : NotFound} />
          <Route exact path='/torneos/:slug/editar-torneo' component={isLogged ? EditTournament : NotFound} />
          {/* Leagues routes */}
          <Route exact path='/ligas' component={Leagues} />
          <Route exact path='/ligas/:slug' component={LeagueTeams} />
          <Route exact path='/ligas/nueva-liga' component={isLogged ? CreateLeague : NotFound} />
          <Route exact path='/ligas/:slug/editar-liga' component={isLogged ? EditLeague : NotFound} />
          {/* Teams routes */}
          <Route exact path='/ligas/:ligaSlug/:equipoSlug' component={TeamPlayers} />
          <Route exact path='/ligas/:ligaSlug/nuevo-equipo' component={isLogged ? CreateTeam : NotFound} />
          <Route exact path='/ligas/:ligaSlug/:equipoSlug/editar-equipo' component={isLogged ? EditTeam : NotFound} />
          {/* Player routes */}
          <Route exact path='/ligas/:ligaSlug/:equipoSlug/:jugadorSlug' component={PlayerContainer} />
          <Route exact path='/ligas/:ligaSlug/:equipoSlug/nuevo-jugador' component={isLogged ? CreatePlayer : NotFound} />
          <Route exact path='/ligas/:ligaSlug/:equipoSlug/:jugadorSlug/editar-jugador' component={isLogged ? EditPlayer : NotFound} />
          {/* Coach routes */}
          <Route exact path='/ligas/:ligaSlug/:equipoSlug/:entrenadorSlug' component={CoachContainer} />
          <Route exact path='/ligas/:ligaSlug/:equipoSlug/nuevo-entrenador' component={isLogged ? CreateCoach : NotFound} />
          <Route exact path='/ligas/:ligaSlug/:equipoSlug/:entrenadorSlug/editar-entrenador' component={isLogged ? EditCoach : NotFound} />
          {/* Admins routes */}
          <Route exact path='/admins' component={isLogged ? Admins : NotFound} />
          <Route exact path='/admins/:slug' component={isLogged ? AdminContainer : NotFound} />
          <Route exact path='/admins/nuevo-admin' component={isLogged ? CreateAdmin : NotFound} />
          <Route exact path='/admins/:slug/editar-admin' component={isLogged ? EditAdmin : NotFound} />
          {/* Other routes */}
          <Route exact path='/perfil' component={isLogged ? Profile : NotFound} />
          <Route exact path='/conocenos' component={About} />
          <Route exact path='/iniciar-sesion' component={Login} />
          <Route exact path='/recuperar-contraseña' component={Recovery} />
          <Route exact path='/enviar-correo' component={SendMail} />
          <Route exact path='/recuperar' component={ChangePassword} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Layout>
    </HashRouter>
  );
};

export default App;
