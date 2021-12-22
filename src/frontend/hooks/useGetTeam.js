import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetTeam = (API, teamId) => {
  const [team, setTeam] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/equipos/${teamId}`);
    setTeam(response.data);
  }, []);

  return team;
};

export default useGetTeam;
