import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import ReactDOM from 'react-dom';
import reducer from './reducers';
import App from './routes/App.jsx';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
