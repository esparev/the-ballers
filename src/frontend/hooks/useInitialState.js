import { useState, useEffect } from 'react';
import initialState from '../initialState';

const useInitialState = (API) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setState(data))
      .catch((err) => console.log(err));
  }, []);

  return state;
};

export default useInitialState;
