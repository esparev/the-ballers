import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets the tournament's data with the
 * provided id from the API
 * @param {string} API - API URL
 * @param {number} tournamentId - tournament id
 * @returns requested tournament in JSON format
 */
const useGetTournament = (API, tournamentId) => {
  const [tournament, setTournament] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/torneos/${tournamentId}`);
    setTournament(response.data);
  }, []);

  return tournament;
};

export default useGetTournament;
