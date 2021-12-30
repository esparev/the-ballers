import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets all the coaches data from the API
 * @param {string} API - API URL
 * @returns all the coaches in JSON format
 */
const useGetCoaches = (API, teamId) => {
  const [coaches, setCoaches] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/equipos/${teamId}`);
    setCoaches(response.data.coach);
  }, []);

  return coaches;
};

export default useGetCoaches;
