import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetLeagues = (API) => {
  const [leagues, setLeagues] = useState([]);

  useEffect(async () => {
    const response = await axios(API);
    setLeagues(response.data);
  }, []);

  return leagues;
};

export default useGetLeagues;
