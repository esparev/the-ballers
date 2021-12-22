import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetTeams = (API, leagueId) => {
  const [teams, setTeams] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/ligas/${leagueId}`);
    setTeams(response.data.team);
  }, []);

  return teams;
};

export default useGetTeams;
