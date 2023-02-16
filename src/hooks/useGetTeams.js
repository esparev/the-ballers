import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets all the teams data belonging to
 * their respective club from the API
 * @param {string} API - API URL
 * @param {number} clubId - club id
 * @returns all the teams in JSON format
 */
const useGetTeams = (API, clubId) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`${API}/clubs/${clubId}`);
      setTeams(response.data.team);
    }
    fetchData();
  }, []);

  return teams;
};

export default useGetTeams;
