import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetCoach = (API) => {
  const [coach, setCoach] = useState([]);

  useEffect(async () => {
    const response = await axios(API);
    setCoach(response.data);
  }, []);

  return coach;
};

export default useGetCoach;
