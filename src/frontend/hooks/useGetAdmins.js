import { useState, useEffect } from 'react';
import axios from 'axios';
import { authConfig } from '../utils/constants';

const useGetAdmins = (API) => {
  const [admins, setAdmins] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/admins`, authConfig);
    setAdmins(response.data);
  }, []);

  return admins;
};

export default useGetAdmins;
