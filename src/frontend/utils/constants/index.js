/**
 * Authorization header configuration for API request
 */
export const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};
