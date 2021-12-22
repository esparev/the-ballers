import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetPlayer = (API, playerId) => {
  const [player, setPlayer] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/jugadores/${playerId}`);
    setPlayer(response.data);
  }, []);

  return player;
};

export default useGetPlayer;
