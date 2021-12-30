import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets the league's data with the
 * provided id from the API
 * @param {string} API - API URL
 * @param {number} leagueId - league id
 * @returns requested league in JSON format
 */
const useGetLeague = (API, leagueId) => {
  const [league, setLeague] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/ligas/${leagueId}`);
    setLeague(response.data);
  }, []);

  return league;
};

export default useGetLeague;
