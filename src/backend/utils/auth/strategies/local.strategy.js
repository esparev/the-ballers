const { Strategy } = require('passport-local');
const AuthService = require('../../../services/auth.service');
const service = new AuthService();

/**
 * Passport strategy for authenticating with a username and
 * password with various validations to protect the
 * account of the admin.
 */
const LocalStrategy = new Strategy(
	{
		usernameField: 'email',
		passwordField: 'password',
	},
	async (email, password, done) => {
		try {
			const admin = await service.getUser(email, password);
			done(null, admin);
		} catch (error) {
			done(error, false);
		}
	}
);

module.exports = LocalStrategy;
