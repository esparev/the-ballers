import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Layout from '@components/Layout';
import Home from '@containers/Home';
import News from '@containers/News';
import SingleNews from '@containers/SingleNews';
import CreateNews from '@containers/Create/CreateNews';
import EditNews from '@containers/Edit/EditNews';
import Tournaments from '@containers/Tournaments';
import Tournament from '@containers/Tournament';
import CreateTournament from '@containers/Create/CreateTournament';
import EditTournament from '@containers/Edit/EditTournament';
import Clubs from '@containers/Clubs';
import CreateClub from '@containers/Create/CreateClub';
import EditClub from '@containers/Edit/EditClub';
import Teams from '@containers/Teams';
import CreateTeam from '@containers/Create/CreateTeam';
import EditTeam from '@containers/Edit/EditTeam';
import TeamPlayers from '@containers/TeamPlayers';
import CreatePlayer from '@containers/Create/CreatePlayer';
import EditPlayer from '@containers/Edit/EditPlayer';
import CreateCoach from '@containers/Create/CreateCoach';
import EditCoach from '@containers/Edit/EditCoach';
import Player from '@containers/Player';
import Coach from '@containers/Coach';
import Admins from '@containers/Admins';
import Admin from '@containers/Admin';
import CreateAdmin from '@containers/Create/CreateAdmin';
import EditAdmin from '@containers/Edit/EditAdmin';
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
 * @param {*} isLogged - data to verify the login status of an admin
 * @returns routing for the entire react app
 */
const App = ({ isLogged }) => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* News routes */}
          <Route exact path='/news' component={News} />
          <Route exact path='/news/:slug' component={SingleNews} />
          <Route exact path='/new-news' component={isLogged ? CreateNews : NotFound} />
          <Route exact path='/edit-news/:slug' component={isLogged ? EditNews : NotFound} />
          {/* Tournaments routes */}
          <Route exact path='/tournaments' component={Tournaments} />
          <Route exact path='/tournament/:slug' component={Tournament} />
          <Route exact path='/new-tournament' component={isLogged ? CreateTournament : NotFound} />
          <Route exact path='/edit-tournament/:slug' component={isLogged ? EditTournament : NotFound} />
          {/* Clubs routes */}
          <Route exact path='/clubs' component={Clubs} />
          <Route exact path='/club/:slug' component={Teams} />
          <Route exact path='/new-club' component={isLogged ? CreateClub : NotFound} />
          <Route exact path='/edit-club/:slug' component={isLogged ? EditClub : NotFound} />
          {/* Teams routes */}
          <Route exact path='/club/:clubSlug/team/:teamSlug' component={TeamPlayers} />
          <Route exact path='/new-team' component={isLogged ? CreateTeam : NotFound} />
          <Route exact path='/edit-team/:slug' component={isLogged ? EditTeam : NotFound} />
          {/* Player routes */}
          <Route exact path='/club/:clubSlug/team/:teamSlug/player/:playerSlug' component={Player} />
          <Route exact path='/new-player' component={isLogged ? CreatePlayer : NotFound} />
          <Route exact path='/edit-player/:slug' component={isLogged ? EditPlayer : NotFound} />
          {/* Coach routes */}
          <Route exact path='/club/:clubSlug/team/:teamSlug/coach/:coachSlug' component={Coach} />
          <Route exact path='/new-coach' component={isLogged ? CreateCoach : NotFound} />
          <Route exact path='/edit-coach/:slug' component={isLogged ? EditCoach : NotFound} />
          {/* Admins routes */}
          <Route exact path='/admins' component={isLogged ? Admins : NotFound} />
          <Route exact path='/admin/:slug' component={isLogged ? Admin : NotFound} />
          <Route exact path='/new-admin' component={isLogged ? CreateAdmin : NotFound} />
          <Route exact path='/edit-admin/:slug' component={isLogged ? EditAdmin : NotFound} />
          {/* Other routes */}
          <Route exact path='/profile' component={isLogged ? Profile : NotFound} />
          <Route exact path='/about' component={About} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/change-password' component={Recovery} />
          <Route exact path='/send-mail' component={SendMail} />
          <Route exact path='/recovery' component={ChangePassword} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
