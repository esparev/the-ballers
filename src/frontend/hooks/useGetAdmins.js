import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetAdmins = (API) => {
  const [admins, setAdmins] = useState([]);

  /**
   * Authorization header configuration for API request
   */
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  useEffect(async () => {
    const response = await axios(API, config);
    setAdmins(response.data);
  }, []);

  return admins;
};

export default useGetAdmins;
