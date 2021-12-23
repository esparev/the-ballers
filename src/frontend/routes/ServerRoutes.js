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
import Profile from '../containers/Profile';
import About from '../containers/About';
import Login from '../containers/Login';
import Recovery from '../containers/Recovery';
import SendMail from '../containers/SendMail';
import ChangePassword from '../containers/ChangePassword';
import NotFound from '../containers/NotFound';

const serverRoutes = (isLogged) => {
  return [
    {
      exact: true,
      path: '/',
      component: Home,
    },
    // News routes
    {
      exact: true,
      path: '/noticias',
      component: News,
    },
    {
      exact: true,
      path: '/noticias/noticia/:id',
      component: SingleNews,
    },
    {
      exact: true,
      path: '/noticias/nueva-noticia',
      component: isLogged ? CreateNews : NotFound,
    },
    {
      exact: true,
      path: '/noticias/noticia/:id/editar-noticia',
      component: isLogged ? EditNews : NotFound,
    },
    // Tournaments routes
    {
      exact: true,
      path: '/torneos',
      component: Tournaments,
    },
    {
      exact: true,
      path: '/torneos/torneo/:id',
      component: Tournament,
    },
    {
      exact: true,
      path: '/torneos/nuevo-torneo',
      component: isLogged ? CreateTournament : NotFound,
    },
    {
      exact: true,
      path: '/torneos/torneo/:id/editar-torneo',
      component: isLogged ? EditTournament : NotFound,
    },
    // Leagues routes
    {
      exact: true,
      path: '/ligas',
      component: Leagues,
    },
    {
      exact: true,
      path: '/ligas/liga/:id',
      component: LeagueTeams,
    },
    {
      exact: true,
      path: '/ligas/nueva-liga',
      component: isLogged ? CreateLeague : NotFound,
    },
    {
      exact: true,
      path: '/ligas/liga/:id/editar-liga',
      component: isLogged ? EditLeague : NotFound,
    },
    // Teams routes
    {
      exact: true,
      path: '/ligas/liga/:leagueId/equipo/:teamId',
      component: TeamPlayers,
    },
    {
      exact: true,
      path: '/ligas/liga/:leagueId/nuevo-equipo',
      component: isLogged ? CreateTeam : NotFound,
    },
    {
      exact: true,
      path: '/ligas/liga/:leagueId/equipo/:teamId/editar-equipo',
      component: isLogged ? EditTeam : NotFound,
    },
    // Players routes
    {
      exact: true,
      path: '/ligas/liga/:leagueId/equipo/:teamId/jugador/:playerId',
      component: PlayerContainer,
    },
    {
      exact: true,
      path: '/ligas/liga/:leagueId/equipo/:teamId/nuevo-jugador',
      component: isLogged ? CreatePlayer : NotFound,
    },
    {
      exact: true,
      path: '/ligas/liga/:leagueId/equipo/:teamId/jugador/:playerId/editar-jugador',
      component: isLogged ? EditPlayer : NotFound,
    },
    // Coaches routes
    {
      exact: true,
      path: '/ligas/liga/:leagueId/equipo/:teamId/entrenador/:coachId',
      component: CoachContainer,
    },
    {
      exact: true,
      path: '/ligas/liga/:leagueId/equipo/:teamId/nuevo-entrenador',
      component: isLogged ? CreateCoach : NotFound,
    },
    {
      exact: true,
      path: '/ligas/liga/:leagueId/equipo/:teamId/entrenador/:coachId/editar-entrenador',
      component: isLogged ? EditCoach : NotFound,
    },
    // Admins routes
    {
      exact: true,
      path: '/admins',
      component: isLogged ? Admins : NotFound,
    },
    {
      exact: true,
      path: '/admins/admin/:id',
      component: isLogged ? AdminContainer : NotFound,
    },
    {
      exact: true,
      path: '/admins/nuevo-admin',
      component: isLogged ? CreateAdmin : NotFound,
    },
    {
      exact: true,
      path: '/admins/admin/:id/editar-admin',
      component: isLogged ? EditAdmin : NotFound,
    },
    // Other routes
    {
      exact: true,
      path: '/perfil',
      component: isLogged ? Profile : NotFound,
    },
    {
      exact: true,
      path: '/conocenos',
      component: About,
    },
    // {
    //   exact: true,
    //   path: '/unete',
    //   component: JoinLeague,
    // },
    {
      exact: true,
      path: '/iniciar-sesion',
      component: Login,
    },
    {
      exact: true,
      path: '/recuperar-contraseña',
      component: Recovery,
    },
    {
      exact: true,
      path: '/enviar-correo',
      component: SendMail,
    },
    {
      exact: true,
      path: '/cambiar-contraseña',
      component: ChangePassword,
    },
    {
      name: 'NotFound',
      component: NotFound,
    },
  ];
};

export default serverRoutes;
