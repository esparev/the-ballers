import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetTeams = (API) => {
  const [teams, setTeams] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/equipos`);
    setTeams(response.data);
  }, []);

  return teams;
};

export default useGetTeams;
