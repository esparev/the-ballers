import Cookie from 'js-cookie';
import { envConfig } from '../config';
/**
 * Authorization header configuration for API request
 */
export const authConfig = {
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('token')}`,
    Authorization: `Bearer ${Cookie.get('token')}`,
  },
};

/**
 * Cookie options
 */
export const cookieConfig = {
  httpOnly: !envConfig.env,
  secure: !envConfig.env,
};
