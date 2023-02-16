import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets all the news data from the API
 * @param {string} API - API URL
 * @returns all the news in JSON format
 */
const useGetNews = (API) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`${API}/news`);
      setNews(response.data);
    }
    fetchData();
  }, []);

  return news;
};

export default useGetNews;
