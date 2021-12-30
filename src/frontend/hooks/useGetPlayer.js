import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets the player's data with the
 * provided id from the API
 * @param {string} API - API URL
 * @param {number} playerId - player id
 * @returns requested player in JSON format
 */
const useGetPlayer = (API, playerId) => {
  const [player, setPlayer] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/jugadores/${playerId}`);
    setPlayer(response.data);
  }, []);

  return player;
};

export default useGetPlayer;
