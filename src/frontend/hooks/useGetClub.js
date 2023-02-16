import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets the club's data with the
 * provided slug from the API
 * @param {string} API - API URL
 * @param {string} clubSlug - club slug
 * @returns requested club in JSON format
 */
const useGetClub = (API, clubSlug) => {
  const [club, setClub] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`${API}/clubs/${clubSlug}`);
      setClub(response.data);
    }
    fetchData();
  }, []);

  return club;
};

export default useGetClub;
