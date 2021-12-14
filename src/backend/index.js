const express = require('express');
const webpack = require('webpack');
const routerApi = require('./routes');
const cors = require('cors');
const passport = require('passport');
const { config } = require('./config');
require('./utils/auth');

const {
	logErrors,
	errorHandler,
	boomErrorHandler,
	ormErrorHandler,
} = require('./middlewares/error.handler');

// Create express app
const app = express();
const port = process.env.PORT || 3000;

if (config.dev) {
	console.log('Development config');
	const webpackConfig = require('../../webpack.config.dev');
	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');

	const compiler = webpack(webpackConfig);
	const serverConfig = {
		serverSideRender: true,
		publicPath: webpackConfig.output.publicPath,
	};

	app.use(webpackDevMiddleware(compiler, serverConfig));
	app.use(webpackHotMiddleware(compiler));
} else {
	console.log('Production config');
}

// Middlewares
app.use(passport.initialize());
app.use(express.json());

const whitelist = [
	'http://localhost:8080',
	'http://localhost:3000',
	'http://localhost:3003',
	'https://beismich.netlify.app',
];
const options = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error('No permitido'));
		}
	},
};

app.use(cors(options));
// Router Api
routerApi(app);
// Error middlewares
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Listen express app in port
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
