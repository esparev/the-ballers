import React, { useEffect } from 'react';
import PrimaryButton from '@components/PrimaryButton';
import '@styles/NotFound.scss';
import baseballIcon from '@icons/baseball-icon.svg';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the not found page with all its functions
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const NotFound = () => {
  useEffect(() => {
    document.title = 'Not Found • The Ballers';
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
      <PrimaryButton name='Regresar' route='/' />
    </main>
  );
};

export default NotFound;
