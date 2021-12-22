import { useState, useEffect } from 'react';
import axios from 'axios';

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
