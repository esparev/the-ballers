import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetCoaches = (API, teamId) => {
  const [coaches, setCoaches] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/equipos/${teamId}`);
    setCoaches(response.data.coach);
  }, []);

  return coaches;
};

export default useGetCoaches;
