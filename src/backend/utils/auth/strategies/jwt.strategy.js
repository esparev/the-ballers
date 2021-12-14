const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');

/**
 * passport-jwt strategy options constant
 */
const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.jwtSecret,
};

/**
 * Passport strategy for authenticating with a JSON
 * Web Token
 */
const JwtStrategy = new Strategy(options, (payload, done) => {
	return done(null, payload);
});

module.exports = JwtStrategy;
