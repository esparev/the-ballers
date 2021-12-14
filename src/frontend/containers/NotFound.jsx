import React, { useEffect } from 'react';
import '../assets/styles/components/NotFound.scss';
import baseballIcon from '../assets/icons/baseball-icon.svg';
import YellowButton from '../components/YellowButton';

const NotFound = () => {
  useEffect(() => {
    document.title = 'BEISMICH • 404 Not Found';
  }, []);
  return (
    <main className='not-found-main'>
      <div className='not-found__container'>
        <p className='not-found__container--four'>4</p>
        <img
          className='not-found__container--baseball'
          src={baseballIcon}
          alt='Baseball Icon'
        />
        <p className='not-found__container--four'>4</p>
      </div>
      <p className='not-found--message'>¡Ups!, Página no encontrada</p>
      <YellowButton name='Regresar' route='/' />
    </main>
  );
};

export default NotFound;
