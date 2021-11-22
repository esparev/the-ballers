import React from 'react';
import '../assets/styles/components/Footer.scss';
import facebookIcon from '../assets/icons/facebook-icon.svg';

const Footer = () => (
  <footer>
    <div className='footer__container'>
      <div className='footer__container-info made-by'>
        <p>Hecho por Integra • 2021</p>
      </div>
      <div className='footer__container-socials'>
        <img src={facebookIcon} alt='Facebook' />
      </div>
      <div className='footer__container-info beismich'>
        <p>Asociación de Beisbolistas Michoacanos</p>
      </div>
    </div>
  </footer>
);

export default Footer;
