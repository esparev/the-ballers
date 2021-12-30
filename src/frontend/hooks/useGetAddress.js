import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Gets the address's data belonging to its respective
 * league with the provided league id from the API
 * @param {string} API - API URL
 * @param {number} leagueId - league id
 * @returns requested address in JSON format
 */
const useGetAddress = (API, leagueId) => {
  const [address, setAddress] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/ligas/${leagueId}`)
      .then((res) => {
        return axios(`${API}/ligas/${leagueId}`);
      })
      .then((res) => {
        return axios(`${API}/direcciones/${res.data.addressId}`);
      });
    setAddress(response.data);
  }, []);

  return address;
};

export default useGetAddress;
