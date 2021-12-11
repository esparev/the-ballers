const reducer = (state, action) => {
  switch (action.type) {
    // League reducers
    case 'ADD_LEAGUE':
      return {
        ...state,
        leagues: action.payload,
      };
    case 'UPDATE_LEAGUE':
      return {
        ...state,
        leagues: state.leagues.filter((items) => items.id !== action.payload),
      };
    case 'DELETE_LEAGUE':
      return {
        ...state,
        leagues: state.leagues.filter((items) => items.id !== action.payload),
      };
    case 'GET_LEAGUE_SOURCE':
      return {
        ...state,
        viewing:
          state.leagues.find((item) => item.id === Number(action.payload)) ||
          [],
      };
    // Team reducers
    case 'ADD_TEAM':
      return {
        ...state,
        teams: action.payload,
      };
    case 'UPDATE_TEAM':
      return {
        ...state,
        teams: state.teams.filter((items) => items.id !== action.payload),
      };
    case 'DELETE_TEAM':
      return {
        ...state,
        teams: state.teams.filter((items) => items.id !== action.payload),
      };
    case 'GET_TEAM_SOURCE':
      return {
        ...state,
        viewing:
          state.teams.find((item) => item.id === Number(action.payload)) || [],
      };
    // Player reducers
    case 'ADD_PLAYER':
      return {
        ...state,
        players: action.payload,
      };
    case 'UPDATE_PLAYER':
      return {
        ...state,
        players: state.players.filter((items) => items.id !== action.payload),
      };
    case 'DELETE_PLAYER':
      return {
        ...state,
        players: state.players.filter((items) => items.id !== action.payload),
      };
    case 'GET_PLAYER_SOURCE':
      return {
        ...state,
        viewing:
          state.players.find((item) => item.id === Number(action.payload)) ||
          [],
      };
    // Coach reducers
    case 'ADD_COACH':
      return {
        ...state,
        coaches: action.payload,
      };
    case 'UPDATE_COACH':
      return {
        ...state,
        coaches: state.coaches.filter((items) => items.id !== action.payload),
      };
    case 'DELETE_COACH':
      return {
        ...state,
        coaches: state.coaches.filter((items) => items.id !== action.payload),
      };
    case 'GET_COACH_SOURCE':
      return {
        ...state,
        viewing:
          state.coaches.find((item) => item.id === Number(action.payload)) ||
          [],
      };
    // Admin reducers
    case 'ADD_ADMIN':
      return {
        ...state,
        admins: action.payload,
      };
    case 'UPDATE_ADMIN':
      return {
        ...state,
        admins: state.admins.filter((items) => items.id !== action.payload),
      };
    case 'DELETE_ADMIN':
      return {
        ...state,
        admins: state.admins.filter((items) => items.id !== action.payload),
      };
    case 'GET_ADMIN_SOURCE':
      return {
        ...state,
        viewing:
          state.admins.find((item) => item.id === Number(action.payload)) || [],
      };
    case 'LOGIN_REQUEST':
      return {
        ...state,
        admin: action.payload,
      };
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        admin: action.payload,
      };
    // Address reducers
    case 'ADD_ADDRESS':
      return {
        ...state,
        addresses: action.payload,
      };
    case 'UPDATE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.filter(
          (items) => items.id !== action.payload
        ),
      };
    case 'DELETE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.filter(
          (items) => items.id !== action.payload
        ),
      };
    // News reducers
    case 'ADD_NEWS':
      return {
        ...state,
        news: action.payload,
      };
    case 'UPDATE_NEWS':
      return {
        ...state,
        news: state.news.filter((items) => items.id !== action.payload),
      };
    case 'DELETE_NEWS':
      return {
        ...state,
        news: state.news.filter((items) => items.id !== action.payload),
      };
    case 'GET_NEWS_SOURCE':
      return {
        ...state,
        viewing:
          state.news.find((item) => item.id === Number(action.payload)) || [],
      };
    // Tournament reducers
    case 'ADD_TOURNAMENT':
      return {
        ...state,
        tournaments: action.payload,
      };
    case 'UPDATE_TOURNAMENT':
      return {
        ...state,
        tournaments: state.tournaments.filter(
          (items) => items.id !== action.payload
        ),
      };
    case 'DELETE_TOURNAMENT':
      return {
        ...state,
        tournaments: state.tournaments.filter(
          (items) => items.id !== action.payload
        ),
      };
    case 'GET_TOURNAMENT_SOURCE':
      return {
        ...state,
        viewing:
          state.tournaments.find(
            (item) => item.id === Number(action.payload)
          ) || [],
      };
    default:
      return state;
  }
};

export default reducer;
