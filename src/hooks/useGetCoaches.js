import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets all the coaches data from the API
 * @param {string} API - API URL
 * @returns all the coaches in JSON format
 */
const useGetCoaches = (API, teamSlug) => {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`${API}/teams/${teamSlug}`);
      setCoaches(response.data.coach);
    }
    fetchData();
  }, []);

  return coaches;
};

export default useGetCoaches;
