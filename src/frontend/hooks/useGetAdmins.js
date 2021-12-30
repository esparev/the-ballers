import { useState, useEffect } from 'react';
import axios from 'axios';
import { authConfig } from '../utils/constants';

/**
 * Gets all the admins data from the API
 * @param {string} API - API URL
 * @returns all the admins in JSON format
 */
const useGetAdmins = (API) => {
  const [admins, setAdmins] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/admins`, authConfig);
    setAdmins(response.data);
  }, []);

  return admins;
};

export default useGetAdmins;
