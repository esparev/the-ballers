const passport = require('passport');
const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const axios = require('axios');
const { config } = require('../../../config');

/**
 * Passport strategy for authenticating with a username and
 * password with various validations to protect the
 * account of the admin.
 */
passport.use(
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const { data, status } = await axios({
          url: `${config.apiUrl}/auth/iniciar-sesion`,
          method: 'post',
          auth: {
            email,
            password,
          },
          data: {
            apiKeyToken: config.apiKeyToken,
          },
        });

        if (!data || status !== 200) {
          return done(boom.unauthorized(), false);
        }

        return done(null, data);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
