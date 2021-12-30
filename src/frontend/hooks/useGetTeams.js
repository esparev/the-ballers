import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets all the teams data belonging to
 * their respective league from the API
 * @param {string} API - API URL
 * @param {number} leagueId - league id
 * @returns all the teams in JSON format
 */
const useGetTeams = (API, leagueId) => {
  const [teams, setTeams] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/ligas/${leagueId}`);
    setTeams(response.data.team);
  }, []);

  return teams;
};

export default useGetTeams;
