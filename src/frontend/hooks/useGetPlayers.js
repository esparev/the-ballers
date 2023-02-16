import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets all the players data belonging to
 * their respective team from the API
 * @param {string} API - API URL
 * @param {string} teamSlug - team slug
 * @returns all the players in JSON format
 */
const useGetPlayers = (API, teamSlug) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`${API}/teams/${teamSlug}`);
      setPlayers(response.data.player);
    }
    fetchData();
  }, []);

  return players;
};

export default useGetPlayers;
