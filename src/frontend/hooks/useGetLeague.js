import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetLeague = (API, leagueId) => {
  const [league, setLeague] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/ligas/${leagueId}`);
    setLeague(response.data);
  }, []);

  return league;
};

export default useGetLeague;
