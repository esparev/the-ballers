import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets the news's data with the
 * provided id from the API
 * @param {string} API - API URL
 * @param {number} newsId - news id
 * @returns requested news in JSON format
 */
const useGetNews = (API, newsId) => {
  const [news, setNews] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/noticias/${newsId}`);
    setNews(response.data);
  }, []);

  return news;
};

export default useGetNews;
