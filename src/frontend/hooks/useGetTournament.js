import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets the tournament's data with the
 * provided slug from the API
 * @param {string} API - API URL
 * @param {string} tournamentSlug - tournament slug
 * @returns requested tournament in JSON format
 */
const useGetTournament = (API, tournamentSlug) => {
  const [tournament, setTournament] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`${API}/tournaments/${tournamentSlug}`);
      setTournament(response.data);
    }
    fetchData();
  }, []);

  return tournament;
};

export default useGetTournament;
