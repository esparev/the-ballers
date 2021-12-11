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

const serverRoutes = (isLogged) => {
  return [
    // Home server route
    {
      exact: true,
      path: '/',
      component: Home,
    },
    // News server routes
    {
      exact: true,
      path: '/noticias',
      component: News,
    },
    {
      exact: true,
      path: '/noticias/:id',
      component: SingleNews,
    },
    {
      exact: true,
      path: '/noticias/nueva-noticia',
      component: isLogged ? CreateNews : Login,
    },
    {
      exact: true,
      path: '/noticias/:id/editar-noticia',
      component: isLogged ? EditNews : Login,
    },
    // Tournament server routes
    {
      exact: true,
      path: '/torneos',
      component: Tournaments,
    },
    {
      exact: true,
      path: '/torneos/:id',
      component: Tournament,
    },
    {
      exact: true,
      path: '/torneos/nueva-torneo',
      component: isLogged ? CreateTournament : Login,
    },
    {
      exact: true,
      path: '/torneos/:id/editar-torneo',
      component: isLogged ? EditTournament : Login,
    },
    // League server routes
    {
      exact: true,
      path: '/ligas',
      component: Leagues,
    },
    {
      exact: true,
      path: '/ligas/:id',
      component: LeagueTeams,
    },
    {
      exact: true,
      path: '/ligas/nueva-liga',
      component: isLogged ? CreateLeague : Login,
    },
    {
      exact: true,
      path: '/ligas/:id/editar-liga',
      component: isLogged ? EditLeague : Login,
    },
    // Team server routes
    {
      exact: true,
      path: '/ligas/:ligaId/equipo/:equipoId',
      component: TeamPlayers,
    },
    {
      exact: true,
      path: '/ligas/:id/nuevo-equipo',
      component: isLogged ? CreateTeam : Login,
    },
    {
      exact: true,
      path: '/ligas/:ligaId/equipo/:equipoId/editar-equipo',
      component: isLogged ? EditTeam : Login,
    },
    // Player server routes
    {
      exact: true,
      path: '/ligas/:ligaId/equipo/:equipoId/:jugadorId',
      component: PlayerContainer,
    },
    {
      exact: true,
      path: '/ligas/:ligaId/equipo/:equipoId/nuevo-jugador',
      component: isLogged ? CreatePlayer : Login,
    },
    {
      exact: true,
      path: '/ligas/:ligaId/equipo/:equipoId/:jugadorId/editar-jugador',
      component: isLogged ? EditPlayer : Login,
    },
    // Coach server routes
    {
      exact: true,
      path: '/ligas/:ligaId/equipo/:equipoId/:entrenadorId',
      component: CoachContainer,
    },
    {
      exact: true,
      path: '/ligas/:ligaId/equipo/:equipoId/nuevo-entrenador',
      component: isLogged ? CreateCoach : Login,
    },
    {
      exact: true,
      path: '/ligas/:ligaId/equipo/:equipoId/:entrenadorId/editar-entrenador',
      component: isLogged ? EditCoach : Login,
    },
    // Admin server routes
    {
      exact: true,
      path: '/admins',
      component: isLogged ? Admins : Login,
    },
    {
      exact: true,
      path: '/admins/:id',
      component: isLogged ? AdminContainer : Login,
    },
    {
      exact: true,
      path: '/admins/nuevo-admin',
      component: isLogged ? CreateAdmin : Login,
    },
    {
      exact: true,
      path: '/admins/:id/editar-admin',
      component: isLogged ? EditAdmin : Login,
    },
    // Other server routes
    {
      exact: true,
      path: '/conocenos',
      component: About,
    },
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
    // Not found server route
    {
      name: 'NotFound',
      component: NotFound,
    },
  ];
};

export default serverRoutes;
