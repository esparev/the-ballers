import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetCoach = (API, coachId) => {
  const [coach, setCoach] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/entrenadores/${coachId}`);
    setCoach(response.data);
  }, []);

  return coach;
};

export default useGetCoach;
