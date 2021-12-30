import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
// ---------------------------------------- END OF IMPORTS

// Renders the entire react app
// into the DOM tree of the index.html
// file from the public folder
ReactDOM.render(
  <App isLogged={localStorage.getItem('id')} />,
  document.getElementById('app')
);
