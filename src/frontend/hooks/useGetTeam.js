import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets the team's data with the
 * provided slug from the API
 * @param {string} API - API URL
 * @param {string} teamSlug - team slug
 * @returns requested team in JSON format
 */
const useGetTeam = (API, teamSlug) => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`${API}/teams/${teamSlug}`);
      setTeam(response.data);
    }
    fetchData();
  }, []);

  return team;
};

export default useGetTeam;
