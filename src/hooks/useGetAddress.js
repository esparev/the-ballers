import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets the address's data belonging to its respective
 * club with the provided club slug from the API
 * @param {string} API - API URL
 * @param {number} clubSlug - club slug
 * @returns requested address in JSON format
 */
const useGetAddress = (API, clubSlug) => {
  const [address, setAddress] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/clubs/${clubSlug}`)
      .then((res) => {
        return axios(`${API}/clubs/${clubSlug}`);
      })
      .then((res) => {
        return axios(`${API}/addresses/${res.data.addressId}`);
      });
    setAddress(response.data);
  }, []);

  return address;
};

export default useGetAddress;
