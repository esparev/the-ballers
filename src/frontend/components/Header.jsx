import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Header.scss';
import beismichLogo from '../assets/static/beismich-logo.png';
import burgerMenuIcon from '../assets/icons/burger-menu-icon.svg';

const Header = () => (
  <header>
    <Link className='header--logo' to='/'>
      <img src={beismichLogo} alt='Logo BEISMICH' />
    </Link>
    <div>
      <a class='header--burger-menu' href=''>
        <img src={burgerMenuIcon} alt='Menu' />
      </a>
      <nav className='header__nav'>
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
            <Link to='/'>Conócenos</Link>
          </li>
          <li className='header__nav-list--item'>
            <Link to='/'>
              <img src='../assets/icons/user-icon.svg' alt='Usuario' />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
