import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetPlayer = (API) => {
  const [player, setPlayer] = useState([]);

  useEffect(async () => {
    const response = await axios(API);
    setPlayer(response.data);
  }, []);

  return player;
};

export default useGetPlayer;
