import axios from 'axios';

// League actions
export const addLeague = (payload) => ({
  type: 'ADD_LEAGUE',
  payload,
});

export const updateLeague = (payload) => ({
  type: 'UPDATE_LEAGUE',
  payload,
});

export const deleteLeague = (payload) => ({
  type: 'DELETE_LEAGUE',
  payload,
});

export const getLeagueSource = (payload) => ({
  type: 'GET_LEAGUE_SOURCE',
  payload,
});

// Team actions
export const addTeam = (payload) => ({
  type: 'ADD_TEAM',
  payload,
});

export const updateTeam = (payload) => ({
  type: 'UPDATE_TEAM',
  payload,
});

export const deleteTeam = (payload) => ({
  type: 'DELETE_TEAM',
  payload,
});

export const getTeamSource = (payload) => ({
  type: 'GET_TEAM_SOURCE',
  payload,
});

// Player actions
export const addPlayer = (payload) => ({
  type: 'ADD_PLAYER',
  payload,
});

export const updatePlayer = (payload) => ({
  type: 'UPDATE_PLAYER',
  payload,
});

export const deletePlayer = (payload) => ({
  type: 'DELETE_PLAYER',
  payload,
});

export const getPlayerSource = (payload) => ({
  type: 'GET_PLAYER_SOURCE',
  payload,
});

// Coach actions
export const addCoach = (payload) => ({
  type: 'ADD_COACH',
  payload,
});

export const updateCoach = (payload) => ({
  type: 'UPDATE_COACH',
  payload,
});

export const deleteCoach = (payload) => ({
  type: 'DELETE_COACH',
  payload,
});

export const getCoachSource = (payload) => ({
  type: 'GET_COACH_SOURCE',
  payload,
});

// Admin actions
export const addAdmin = (payload) => ({
  type: 'ADD_ADMIN',
  payload,
});

export const updateAdmin = (payload) => ({
  type: 'UPDATE_ADMIN',
  payload,
});

export const deleteAdmin = (payload) => ({
  type: 'DELETE_ADMIN',
  payload,
});

export const getAdminSource = (payload) => ({
  type: 'GET_ADMIN_SOURCE',
  payload,
});

export const loginRequest = (payload) => ({
  type: 'LOGIN_REQUEST',
  payload,
});

export const setError = (payload) => ({
  type: 'SET_ERROR',
  payload,
});

export const loginAdmin = ({ email, password }, redirectUrl) => {
  return (dispatch) => {
    axios({
      url: '/auth/sign-in',
      method: 'post',
      auth: {
        username: email,
        password,
      },
    })
      .then(({ data }) => {
        document.cookie = `email=${data.user.email}`;
        document.cookie = `name=${data.user.name}`;
        document.cookie = `id=${data.user.id}`;
        dispatch(loginRequest(data));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((error) => {
        dispatch(setError(error));
      });
  };
};

export const logoutRequest = (payload) => ({
  type: 'LOGOUT_REQUEST',
  payload,
});

// Address actions
export const addAddress = (payload) => ({
  type: 'ADD_ADDRESS',
  payload,
});

export const updateAddress = (payload) => ({
  type: 'UPDATE_ADDRESS',
  payload,
});

export const deleteAddress = (payload) => ({
  type: 'DELETE_ADDRESS',
  payload,
});

// News actions
export const addNews = (payload) => ({
  type: 'ADD_NEWS',
  payload,
});

export const updateNews = (payload) => ({
  type: 'UPDATE_NEWS',
  payload,
});

export const deleteNews = (payload) => ({
  type: 'DELETE_NEWS',
  payload,
});

export const getNewsSource = (payload) => ({
  type: 'GET_NEWS_SOURCE',
  payload,
});

// Tournament actions
export const addTournament = (payload) => ({
  type: 'ADD_TOURNAMENT',
  payload,
});

export const updateTournament = (payload) => ({
  type: 'UPDATE_TOURNAMENT',
  payload,
});

export const deleteTournament = (payload) => ({
  type: 'DELETE_TOURNAMENT',
  payload,
});

export const getTournamentSource = (payload) => ({
  type: 'GET_TOURNAMENT_SOURCE',
  payload,
});
