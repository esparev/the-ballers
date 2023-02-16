import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets the player's data with the
 * provided slug from the API
 * @param {string} API - API URL
 * @param {string} playerSlug - player slug
 * @returns requested player in JSON format
 */
const useGetPlayer = (API, playerSlug) => {
  const [player, setPlayer] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`${API}/players/${playerSlug}`);
      setPlayer(response.data);
    }
    fetchData();
  }, []);

  return player;
};

export default useGetPlayer;
