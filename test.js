const axios = require('axios');
const { createStore } = require('redux');
const reducer = require('./src/frontend/reducers');

const renderApp = async (req, res) => {
  let initialState;
  // Get leagues
  let leaguesList = await axios({
    url: 'https://beismich.herokuapp.com/api/v1/ligas',
    method: 'get',
  });
  leaguesList = leaguesList.data;
  // console.log(leaguesList);

  initialState = {
    admin: {
      id: 0,
    },
    leagues: leaguesList.filter((item) => item.id),
  };

  // console.log(initialState);
  console.log(initialState.leagues[0].name);

  const store = createStore(reducer, initialState);
  const isLogged = initialState.admin.id;
  console.log(isLogged);
  // console.log(store.getState());
};

renderApp();
