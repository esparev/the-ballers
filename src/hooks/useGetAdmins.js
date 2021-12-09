import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetAdmins = (API) => {
  const [admins, setAdmins] = useState([]);

  useEffect(async () => {
    const response = await axios(API);
    setAdmins(response.data);
  }, []);

  return admins;
};

export default useGetAdmins;
