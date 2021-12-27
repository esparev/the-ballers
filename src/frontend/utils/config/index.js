/**
 * @description description of each environment variable
 * @typedef {Object} field definition
 * @property {*} env - define environment type production || dev
 * @property {*} isProd - verify environment type production
 * @property {*} port - server port
 * @property {*} apiUrl - api url
 */
export const envConfig = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  apiUrl: process.env.API_URL,
};
