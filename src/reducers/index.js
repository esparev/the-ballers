const reducer = (state, action) => {
  switch (action.type) {
    // League reducers
    case 'ADD_LEAGUE':
      return {
        ...state,
        league: action.payload,
      };
    case 'UPDATE_LEAGUE':
      return {
        ...state,
        league: state.league.filter((items) => items.id !== action.payload),
      };
    case 'DELETE_LEAGUE':
      return {
        ...state,
        league: state.league.filter((items) => items.id !== action.payload),
      };
    // Team reducers
    case 'ADD_TEAM':
      return {
        ...state,
        team: action.payload,
      };
    case 'UPDATE_TEAM':
      return {
        ...state,
        team: state.team.filter((items) => items.id !== action.payload),
      };
    case 'DELETE_TEAM':
      return {
        ...state,
        team: state.team.filter((items) => items.id !== action.payload),
      };
    // Player reducers
    case 'ADD_PLAYER':
      return {
        ...state,
        player: action.payload,
      };
    case 'UPDATE_PLAYER':
      return {
        ...state,
        player: state.player.filter((items) => items.id !== action.payload),
      };
    case 'DELETE_PLAYER':
      return {
        ...state,
        player: state.player.filter((items) => items.id !== action.payload),
      };
    // Coach reducers
    case 'ADD_COACH':
      return {
        ...state,
        coach: action.payload,
      };
    case 'UPDATE_COACH':
      return {
        ...state,
        coach: state.coach.filter((items) => items.id !== action.payload),
      };
    case 'DELETE_COACH':
      return {
        ...state,
        coach: state.coach.filter((items) => items.id !== action.payload),
      };
    // Admin reducers
    case 'ADD_ADMIN':
      return {
        ...state,
        admin: action.payload,
      };
    case 'UPDATE_ADMIN':
      return {
        ...state,
        admin: state.admin.filter((items) => items.id !== action.payload),
      };
    case 'DELETE_ADMIN':
      return {
        ...state,
        admin: state.admin.filter((items) => items.id !== action.payload),
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
        address: action.payload,
      };
    case 'UPDATE_ADDRESS':
      return {
        ...state,
        address: state.address.filter((items) => items.id !== action.payload),
      };
    case 'DELETE_ADDRESS':
      return {
        ...state,
        address: state.address.filter((items) => items.id !== action.payload),
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
    // Tournament reducers
    case 'ADD_TOURNAMENT':
      return {
        ...state,
        tournament: action.payload,
      };
    case 'UPDATE_TOURNAMENT':
      return {
        ...state,
        tournament: state.tournament.filter((items) => items.id !== action.payload),
      };
    case 'DELETE_TOURNAMENT':
      return {
        ...state,
        tournament: state.tournament.filter((items) => items.id !== action.payload),
      };
  }
};

export default reducer;
