import React, { useEffect } from 'react';
import '../assets/styles/App.scss';

const Home = () => {
  useEffect(() => {
    document.title = 'BEISMICH';
  }, []);

  return (
    <>
      <h1>HELLO</h1>
    </>
  );
};

export default Home;
