import React from 'react';
import '@styles/Footer.scss';
import facebookIcon from '@icons/facebook-icon.svg';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the footer component with all its functions 
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const Footer = () => (
  <footer id='footer'>
    <div className='footer__container'>
      <div className='footer__container-info made-by'>
        <p>Hecho por Integra • 2021</p>
      </div>
      <div className='footer__container-socials'>
        <a
          href='https://www.facebook.com/BEISMICH'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={facebookIcon} alt='Facebook' />
        </a>
      </div>
      <div className='footer__container-info beismich'>
        <p>Asociación de Beisbolistas Michoacanos</p>
      </div>
    </div>
  </footer>
);

export default Footer;
