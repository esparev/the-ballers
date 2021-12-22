import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetTournament = (API, tournamentId) => {
  const [tournament, setTournament] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/torneos/${tournamentId}`);
    setTournament(response.data);
  }, []);

  return tournament;
};

export default useGetTournament;
