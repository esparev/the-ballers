import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets all the leagues data from the API
 * @param {string} API - API URL
 * @returns all the leagues in JSON format
 */
const useGetLeagues = (API) => {
  const [leagues, setLeagues] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/ligas`);
    setLeagues(response.data);
  }, []);

  return leagues;
};

export default useGetLeagues;
