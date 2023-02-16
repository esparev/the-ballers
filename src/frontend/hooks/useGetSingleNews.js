import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets the news's data with the
 * provided slug from the API
 * @param {string} API - API URL
 * @param {string} newsSlug - news slug
 * @returns requested news in JSON format
 */
const useGetNews = (API, newsSlug) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(`${API}/news/${newsSlug}`);
      setNews(response.data);
    }
    fetchData();
  }, []);

  return news;
};

export default useGetNews;
