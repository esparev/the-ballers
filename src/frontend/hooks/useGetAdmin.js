import { useState, useEffect } from 'react';
import axios from 'axios';
import { authConfig } from '@constants';

/**
 * Gets the admin's data with the
 * provided slug from the API
 * @param {string} API - API URL
 * @param {string} adminSlug - admin slug
 * @returns requested admin in JSON format
 */
const useGetAdmin = (API, adminSlug) => {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`${API}/admins/${adminSlug}`, authConfig);
      setAdmin(response.data);
    }
    fetchData();
  }, []);

  return admin;
};

export default useGetAdmin;
