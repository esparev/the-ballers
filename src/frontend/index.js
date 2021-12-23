import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import reducer from './reducers';
import App from './routes/App.jsx';

const store = createStore(reducer);

ReactDOM.hydrate(
  <Provider store={store}>
    <App isLogged={localStorage.getItem('id')} />
  </Provider>,
  document.getElementById('app')
);
