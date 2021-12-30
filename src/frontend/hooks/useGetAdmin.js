import { useState, useEffect } from 'react';
import axios from 'axios';
import { authConfig } from '../utils/constants';

/**
 * Gets the admin's data with the 
 * provided id from the API
 * @param {string} API - API URL
 * @param {number} adminId - admin id
 * @returns requested admin in JSON format
 */
const useGetAdmin = (API, adminId) => {
  const [admin, setAdmin] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/admins/${adminId}`, authConfig);
    setAdmin(response.data);
  }, []);

  return admin;
};

export default useGetAdmin;
