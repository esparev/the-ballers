import { useState, useEffect } from 'react';
import axios from 'axios';
import { config } from '../utils/constants';

const useGetAdmins = (API) => {
  const [admins, setAdmins] = useState([]);

  useEffect(async () => {
    const response = await axios(API, config);
    setAdmins(response.data);
  }, []);

  return admins;
};

export default useGetAdmins;
