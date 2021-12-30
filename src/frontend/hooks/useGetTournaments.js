import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets all the tournaments from the API
 * @param {string} API - API URL
 * @returns all the tournaments in JSON format
 */
const useGetTournaments = (API) => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/torneos`);
    setTournaments(response.data);
  }, []);

  return tournaments;
};

export default useGetTournaments;
