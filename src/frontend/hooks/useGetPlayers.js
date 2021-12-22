import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetPlayers = (API, teamId) => {
  const [players, setPlayers] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/equipos/${teamId}`);
    setPlayers(response.data.player);
  }, []);

  return players;
};

export default useGetPlayers;
