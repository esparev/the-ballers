import { useState, useEffect } from 'react';
import axios from 'axios';
import { authConfig } from '../utils/constants';

const useGetAdmin = (API, adminId) => {
  const [admin, setAdmin] = useState([]);

  useEffect(async () => {
    const response = await axios(`${API}/admins/${adminId}`, authConfig);
    setAdmin(response.data);
  }, []);

  return admin;
};

export default useGetAdmin;
