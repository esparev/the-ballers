import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets all the tournaments from the API
 * @param {string} API - API URL
 * @returns all the tournaments in JSON format
 */
const useGetTournaments = (API) => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`${API}/tournaments`);
      setTournaments(response.data);
    }
    fetchData();
  }, []);

  return tournaments;
};

export default useGetTournaments;
