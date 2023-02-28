import React from 'react';
import '@styles/HTTPError.scss';
import baseballIcon from '@icons/baseball-icon.svg';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the server error container
 * @returns JSX code to render to the DOM tree
 */
const ServerError = () => {
  return (
    <main className='error-main'>
      <div className='error__container'>
        <p className='error__container--four'>5</p>
        <img className='error__container--baseball' src={baseballIcon} alt='Baseball Icon' />
        <img className='error__container--baseball' src={baseballIcon} alt='Baseball Icon' />
      </div>
      <p className='error--message'>Ups!, There was an error on our end</p>
      <p className='error--sub-message'>We couldn't load our data, try again later</p>
    </main>
  );
};

export default ServerError;
