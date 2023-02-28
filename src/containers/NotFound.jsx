import React, { useEffect } from 'react';
import PrimaryButton from '@components/PrimaryButton';
import '@styles/HTTPError.scss';
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
    <main className='error-main'>
      <div className='error__container'>
        <p className='error__container--four'>4</p>
        <img className='error__container--baseball' src={baseballIcon} alt='Baseball Icon' />
        <p className='error__container--four'>4</p>
      </div>
      <p className='error--message'>Ups!, Page not found</p>
      <p className='error--sub-message'>We couldn't find what you were looking for</p>
      <PrimaryButton name='Regresar' route='/' />
    </main>
  );
};

export default NotFound;
