import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Header.scss';
import beismichLogo from '../assets/static/beismich-logo.png';
import userIcon from '../assets/icons/user-icon.svg';
import burgerMenuIcon from '../assets/icons/burger-menu-icon.svg';

const Header = () => {
  useEffect(() => {
    var nav = document.getElementById('nav');

    const menuDesktop = () => {
      if (screen.width > 836) {
        nav.style.display = 'block';
      }
    };

    nav.addEventListener('resize', menuDesktop);
  }, []);

  const adminDisplay = () => {
    var adminNav = document.getElementById('admin-nav');
    if (adminNav.style.display === 'none' || adminNav.style.display === '') {
      adminNav.style.display = 'block';
    } else {
      adminNav.style.display = 'none';
    }
  };

  const menuDisplay = () => {
    var nav = document.getElementById('nav');
    if (nav.style.display === 'none' || nav.style.display === '') {
      nav.style.display = 'block';
    } else {
      nav.style.display = 'none';
    }
  };

  return (
    <header className='main-header' id='header'>
      <Link className='header--logo' to='/'>
        <img src={beismichLogo} alt='Logo BEISMICH' />
      </Link>
      <div className='header__menu'>
        <a className='header--burger-menu' onClick={menuDisplay}>
          <img src={burgerMenuIcon} alt='Menu' />
        </a>
        <nav className='header__nav nav' id='nav'>
          <ul className='header__nav-list'>
            <li className='header__nav-list--item user-list'>
              <Link to='/noticias'>Noticias</Link>
            </li>
            <li className='header__nav-list--item user-list'>
              <Link to='/torneos'>Torneos</Link>
            </li>
            <li className='header__nav-list--item user-list'>
              <Link to='/ligas'>Ligas</Link>
            </li>
            <li className='header__nav-list--item user-list'>
              <Link to='/conocenos'>Conócenos</Link>
            </li>
            <li className='header__nav-list--item header__nav-list--image'>
              <a onClick={adminDisplay}>
                <img src={userIcon} alt='Usuario' />
              </a>
            </li>
            <div className='header__nav-admin admin-nav' id='admin-nav'>
              <li className='header__nav-list--item'>
                <Link to='/perfil'>Perfil</Link>
              </li>
              <li className='header__nav-list--item'>
                <Link to='/admins'>Administradores</Link>
              </li>
              <li className='header__nav-list--item'>
                <Link to='/iniciar-sesion'>Iniciar sesión</Link>
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
