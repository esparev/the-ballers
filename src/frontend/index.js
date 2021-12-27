import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';

ReactDOM.render(
  <App isLogged={localStorage.getItem('id')} />,
  document.getElementById('app')
);
