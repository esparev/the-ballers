import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets all the clubs data from the API
 * @param {string} API - API URL
 * @returns all the clubs in JSON format
 */
const useGetClubs = (API) => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`${API}/clubs`);
      setClubs(response.data);
    }
    fetchData();
  }, []);

  return clubs;
};

export default useGetClubs;
