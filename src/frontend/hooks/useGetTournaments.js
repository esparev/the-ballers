import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetTournaments = (API) => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(async () => {
    const response = await axios(API);
    setTournaments(response.data);
  }, []);

  return tournaments;
};

export default useGetTournaments;
