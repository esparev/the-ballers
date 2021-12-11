require('dotenv').config();

/**
 * @description description of each environment variable
 * @typedef {Object} field definition
 * @property {*} dev - define environment type production !== production
 * @property {*} port - server port
 * @property {*} dbUrl - database url
 * @property {*} apiUrl - api url
 * @property {*} apiKeyToken - api key token
 */
const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  apiUrl: process.env.API_URL,
  apiKeyToken: process.env.API_KEY_TOKEN,
};

module.exports = { config };
