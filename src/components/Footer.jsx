import React from 'react';
import moment from 'moment';
import '@styles/Footer.scss';
import ballersLogo from '@static/ballers-logo.png';
import facebookIcon from '@icons/facebook-icon.svg';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the footer component with all its functions
 * stored inside for its full operation
 */
const Footer = () => {
  return (
    <footer id='footer'>
      <figure className='footer__logo'>
        <a href='/'>
          <img src={ballersLogo} alt="The Ballers' Logo" />
        </a>
      </figure>
      <div className='footer__info'>
        <div className='footer__links'>
          <a className='footer__links--item' href=''>
            Privacy Policy
          </a>
          <a className='footer__links--item' href=''>
            Terms and Conditions
          </a>
          <a className='footer__links--item' href=''>
            Help
          </a>
          <a className='footer__links--item' href=''>
            Contact Us
          </a>
          <a className='footer__links--item' href=''>
            Accesibility
          </a>
        </div>
        <p className='footer--copyright'>
          © Copyright {moment().format('YYYY')} The Ballers. All rights reserved.
        </p>
        <p className='footer--made-by'>
          Developed and mantained by{' '}
          <a href='https://esparev.com' target='_blank' rel='noreferrer noopener'>
            Esparev
          </a>
          .
        </p>
      </div>
      <figure className='footer__social'>
        <a href='https://esparev.com' target='_blank' rel='noreferrer noopener'>
          <img src={facebookIcon} alt='Facebook icon' />
        </a>
      </figure>
    </footer>
  );
};

export default Footer;
