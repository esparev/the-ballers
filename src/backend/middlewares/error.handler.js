const { ValidationError } = require('sequelize');

function logErrors(err, req, res, next) {
	console.error(err);
	next(err);
}

/**
 * Handles general errors and shows it to the client
 * @param {*} err - error
 * @param {*} req - request object
 * @param {*} res - response object
 * @param {*} next - next middleware
 */
function errorHandler(err, req, res, next) {
	res.status(500).json({
		message: err.message,
		stack: err.stack,
	});
}

/**
 * Handles errors of boom type and shows it to the client
 * @param {*} err - error
 * @param {*} req - request object
 * @param {*} res - response object
 * @param {*} next - next middleware
 */
function boomErrorHandler(err, req, res, next) {
	if (err.isBoom) {
		const { output } = err;
		res.status(output.statusCode).json(output.payload);
	}
	next(err);
}

/**
 * Handles sequelize orm errors and shows it to the client
 * @param {*} err - error
 * @param {*} req - request object
 * @param {*} res - response object
 * @param {*} next - next middleware
 */
function ormErrorHandler(err, req, res, next) {
	if (err instanceof ValidationError) {
		res.status(409).json({
			statusCode: 409,
			message: err.name,
			errors: err.errors,
		});
	}
	next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
