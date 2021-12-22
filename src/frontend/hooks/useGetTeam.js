import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetTeam = (API) => {
  const [team, setTeam] = useState([]);

  useEffect(async () => {
    const response = await axios(API);
    setTeam(response.data);
  }, []);

  return team;
};

export default useGetTeam;
