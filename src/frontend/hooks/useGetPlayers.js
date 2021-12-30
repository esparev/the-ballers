import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets all the players data belonging to
 * their respective team from the API
 * @param {string} API - API URL
 * @param {number} teamId - team id
 * @returns all the players in JSON format
 */
const useGetPlayers = (API, teamId) => {
  const [players, setPlayers] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/equipos/${teamId}`);
    setPlayers(response.data.player);
  }, []);

  return players;
};

export default useGetPlayers;
