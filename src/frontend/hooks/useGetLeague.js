import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetLeague = (API, id) => {
  const [league, setLeague] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/ligas/${id}`);
    setLeague(response.data);
  }, []);

  return league;
};

export default useGetLeague;
