require('dotenv').config();

/**
 * @description description of each environment variable
 * @typedef {Object} field definition
 * @property {*} env - define environment type production || dev
 * @property {*} api - api url
 */
const config = {
  env: process.env.NODE_ENV || 'dev',
  api: process.env.API,
};

module.exports = { config };
