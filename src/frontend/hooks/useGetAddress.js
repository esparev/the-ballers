import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetAddress = (API, id) => {
  const [address, setAddress] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/direcciones/${id}`);
    setAddress(response.data);
  }, []);

  return address;
};

export default useGetAddress;
