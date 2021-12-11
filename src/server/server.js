import express from 'express';
import webpack from 'webpack';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import React from 'react';
import axios from 'axios';
import boom from '@hapi/boom';
import session from 'express-session';
import getManifest from './getManifest';
import reducer from '../frontend/reducers';
import Layout from '../frontend/components/Layout';
import serverRoutes from '../frontend/routes/ServerRoutes';
import { renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { config } from './config';

// Creating express app
const app = express();

const TWO_DAYS_IN_MS = 172800000;

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Local strategy
require('./utils/auth/strategies/local');

if (config.dev) {
  console.log('Development config');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  // Creating a webpack compiler with its configurations
  const compiler = webpack(webpackConfig);
  const serverConfig = {
    serverSideRender: true,
    publicPath: webpackConfig.output.publicPath,
  };
  // Middlewares
  // Middleware to compile all the files and put it on the server
  app.use(webpackDevMiddleware(compiler, serverConfig));
  // Middleware to enable hot reload
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use((req, res, next) => {
    req.hashManifest = getManifest();
    next();
  });
  // Public folder config to load from webpack's bundle
  app.use(express.static(`${__dirname}/public`));
  // Middleware to secure the express app by setting various HTTP headers
  app.use(helmet());
  /*
  permittedCrossDomainPolicies blocks cross-domain content 
  to decrease band-with from mostly adobe products
  */
  app.use(helmet.permittedCrossDomainPolicies());
  /*
  Disables the header that shows information about the server
  our app is connected to
  */
  app.disable('x-powered-by');
}

/**
 * Stores the initial HTML for the app to render
 * on the server side
 * @returns initial HTML as a string
 */
const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="BEISMICH" />
      <link rel="stylesheet" href=${mainStyles} type="text/css" />
      <title>BEISMICH</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script id="preloadedState">
        window.__PRELOADED_STATE__=${JSON.stringify(preloadedState).replace(/</g,'\\u003c')}
      </script>
      <script src=${mainBuild} type="text/javascript"></script>
      <script src=${vendorBuild} type="text/javascript"></script>
    </body>
  </html>`;
};

/**
 * Renders the app from the server side
 * @param {*} req - request
 * @param {*} res - response
 * @returns configured HTML for rendering
 */
const renderApp = async (req, res) => {
  let initialState;
  const { token, email, name, id } = req.cookies;

  try {
    // Get leagues
    let leaguesList = await axios({
      url: `${config.apiUrl}/ligas`,
      method: 'get',
    });
    leaguesList = leaguesList.data;
    // Get addresses
    let addressesList = await axios({
      url: `${config.apiUrl}/direcciones`,
      method: 'get',
    });
    addressesList = addressesList.data;
    // Get teams
    let teamsList = await axios({
      url: `${config.apiUrl}/equipos`,
      method: 'get',
    });
    teamsList = teamsList.data;
    // Get players
    let playersList = await axios({
      url: `${config.apiUrl}/jugadores`,
      method: 'get',
    });
    playersList = playersList.data;
    // Get coaches
    let coachesList = await axios({
      url: `${config.apiUrl}/entrenadores`,
      method: 'get',
    });
    coachesList = coachesList.data;
    // Get admins
    let adminsList = await axios({
      url: `${config.apiUrl}/entrenadores`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    adminsList = adminsList.data;
    // Get news
    let newsList = await axios({
      url: `${config.apiUrl}/noticias`,
      method: 'get',
    });
    newsList = newsList.data;
    // Get tournaments
    let tournamentsList = await axios({
      url: `${config.apiUrl}/torneos`,
      method: 'get',
    });
    tournamentsList = tournamentsList.data;
    // Initial state
    initialState = {
      admin: {
        id,
        email,
        name,
      },
      leagues: leaguesList,
      addresses: addressesList,
      teams: teamsList,
      players: playersList,
      coaches: coachesList,
      admins: adminsList,
      news: newsList,
      tournaments: tournamentsList,
    };
  } catch (error) {
    initialState = {
      admin: {},
      leagues: [],
      addresses: [],
      teams: [],
      players: [],
      coaches: [],
      admins: [],
      news: [],
      tournaments: [],
    };
  }

  const store = createStore(reducer, initialState);
  // Preload the initial state defined in store
  const preloadedState = store.getState();
  const isLogged = initialState.admin.id;
  // Store React elements to its initial HTML as a String for rendering
  // renderRoutes receives the array from serverRoutes

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <Layout>{renderRoutes(serverRoutes(isLogged))}</Layout>
      </StaticRouter>
    </Provider>
  );

  res.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' *; media-src *; script-src 'self' 'unsafe-eval' 'sha256-KlbEnYxSWkHOFqQh7kFtymSpvMiOLtHEL5Zq91zyyjA='; style-src 'self' https://fonts.googleapis.com; font-src *"
  );

  res.send(setResponse(html, preloadedState, req.hashManifest));
};

app.post(
  '/auth/iniciar-sesion',
  passport.authenticate('local', { failureRedirect: '/' }),
  async function (req, res, next) {
    try {
      if (req.user) {
        const { token, ...admin } = req.user;

        res.cookie('token', token, {
          httpOnly: !config.dev,
          secure: !config.dev,
          maxAge: TWO_DAYS_IN_MS,
        });

        res.status(200).json(admin);
      }
    } catch (err) {
      next(err);
    }
  }
);

// Ensure that the server responds to all the routes
app.get('*', renderApp);

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server running on port ${config.port}`);
  }
});
