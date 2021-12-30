import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets the coach's data with the
 * provided id from the API
 * @param {string} API - API URL
 * @param {number} coachId - admin id
 * @returns requested coach in JSON format
 */
const useGetCoach = (API, coachId) => {
  const [coach, setCoach] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/entrenadores/${coachId}`);
    setCoach(response.data);
  }, []);

  return coach;
};

export default useGetCoach;
