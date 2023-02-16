/**
 * Authorization header configuration for API request
 */
export const authConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};
