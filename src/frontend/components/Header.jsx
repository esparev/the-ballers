import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@styles/Header.scss';
import beismichLogo from '@static/beismich-logo.png';
import userIcon from '@icons/user-icon.svg';
import burgerMenuIcon from '@icons/burger-menu-icon.svg';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the header component with all its functions 
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
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

  const logout = () => {
    localStorage.clear();
  };

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
            {localStorage.getItem('image') ? (
              <li className='header__nav-list--admin header__nav-list--image'>
                <a onClick={adminDisplay}>
                  <img src={localStorage.getItem('image')} alt='Usuario' />
                </a>
              </li>
            ) : (
              <li className='header__nav-list--item header__nav-list--image'>
                <a onClick={adminDisplay}>
                  <img src={userIcon} alt='Usuario' />
                </a>
              </li>
            )}
            <div className='header__nav-admin admin-nav' id='admin-nav'>
              {localStorage.getItem('id') ? (
                <>
                  <li className='header__nav-list--item'>
                    <Link to='/perfil'>Perfil</Link>
                  </li>
                  <li className='header__nav-list--item'>
                    <Link to='/admins'>Administradores</Link>
                  </li>
                </>
              ) : null}

              {localStorage.getItem('id') ? (
                <li className='header__nav-list--item'>
                  <Link to='/iniciar-sesion' onClick={logout}>
                    Cerrar sesión
                  </Link>
                </li>
              ) : (
                <li className='header__nav-list--item'>
                  <Link to='/iniciar-sesion'>Iniciar sesión</Link>
                </li>
              )}
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
