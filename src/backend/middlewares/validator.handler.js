const boom = require('@hapi/boom');

/**
 * Validates if the data being entered complies and
 * matches the data rules defined in the schema
 * @param {*} schema schema to validate
 * @param {*} property request object type to find information (params, query or body)
 * @returns dynamic middleware
 */
function validatorHandler(schema, property) {
	return (req, res, next) => {
		/**
		 * Dynamic request object that can receive
		 * the property of a request of the following types:
		 * params - from get request
		 * query - from get request
		 * body - from post or patch request
		 */
		const data = req[property];
		const { error } = schema.validate(data, { abortEarly: false });

		if (error) {
			next(boom.badRequest(error));
		}
		next();
	};
}

module.exports = validatorHandler;
