import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Header.scss';
import beismichLogo from '../assets/static/beismich-logo.png';
import userIcon from '../assets/icons/user-icon.svg';
import burgerMenuIcon from '../assets/icons/burger-menu-icon.svg';

const Header = () => {
  const menuDisplay = () => {
    var el = document.getElementById('nav');
    if (el.style.display === 'block') {
      el.style.display = 'none';
    } else {
      el.style.display = 'block';
    }
  };

  return (
    <header>
      <Link className='header--logo' to='/'>
        <img src={beismichLogo} alt='Logo BEISMICH' />
      </Link>
      <div className='header__menu'>
        <a className='header--burger-menu' onClick={menuDisplay}>
          <img src={burgerMenuIcon} alt='Menu' />
        </a>
        <nav className='header__nav' id='nav'>
          <ul className='header__nav-list'>
            <li className='header__nav-list--item'>
              <Link to='/noticias'>Noticias</Link>
            </li>
            <li className='header__nav-list--item'>
              <Link to='/torneos'>Torneos</Link>
            </li>
            <li className='header__nav-list--item'>
              <Link to='/ligas'>Ligas</Link>
            </li>
            <li className='header__nav-list--item'>
              <Link to='/conocenos-pending'>Conócenos</Link>
            </li>
            <li className='header__nav-list--item'>
              <a href='#'>
                <img src={userIcon} alt='Usuario' />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
