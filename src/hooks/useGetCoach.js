import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets the coach's data with the
 * provided slug from the API
 * @param {string} API - API URL
 * @param {string} coachSlug - coach slug
 * @returns requested coach in JSON format
 */
const useGetCoach = (API, coachSlug) => {
  const [coach, setCoach] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`${API}/coaches/${coachSlug}`);
      setCoach(response.data);
    }
    fetchData();
  }, []);

  return coach;
};

export default useGetCoach;
