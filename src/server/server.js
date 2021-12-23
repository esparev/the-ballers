import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import serverRoutes from '../frontend/routes/ServerRoutes';
import fs from 'fs';
import path from 'path';
import express from 'express';
import Cookie from 'js-cookie';
import Layout from '../frontend/components/Layout';
import App from '../frontend/routes/App';

const PORT = process.env.PORT || 3003;
const app = express();

app.get('/', (req, res) => {
  const isLogged = Cookie.get('id');
  const app = renderToString(
    <StaticRouter location={req.url}>
      <Layout>{renderRoutes(serverRoutes(isLogged))}</Layout>
    </StaticRouter>
  );
  // const app = ReactDOMServer.renderToString(<App />);
  const indexFile = path.resolve('./dist/index.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    res.set(
      'Content-Security-Policy',
      "default-src 'self'; img-src 'self' *; media-src *; script-src 'self' 'unsafe-eval' 'sha256-KlbEnYxSWkHOFqQh7kFtymSpvMiOLtHEL5Zq91zyyjA='; style-src 'self' https://fonts.googleapis.com; font-src *"
    );

    return res.send(
      data.replace('<div id="app"></div>', `<div id="app">${app}</div>`)
    );
  });
});

app.use(express.static('./dist'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
