import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets the team's data with the
 * provided id from the API
 * @param {string} API - API URL
 * @param {number} teamId - team id
 * @returns requested team in JSON format
 */
const useGetTeam = (API, teamId) => {
  const [team, setTeam] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/equipos/${teamId}`);
    setTeam(response.data);
  }, []);

  return team;
};

export default useGetTeam;
