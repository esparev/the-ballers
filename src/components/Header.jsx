import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@styles/Header.scss';
import ballersLogo from '@static/ballers-logo.png';
import burgerMenuIcon from '@icons/burger-menu-icon.svg';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the header component with all its functions
 * stored inside for its full operation
 */
const Header = () => {
  const [logoutStatus, setLogoutStatus] = useState(false);

  useEffect(() => {
    var nav = document.getElementById('nav');

    const menuDesktop = () => {
      if (screen.width > 836) {
        nav.style.display = 'block';
      }
    };

    nav.addEventListener('resize', menuDesktop);
  }, [logoutStatus]);

  const logout = () => {
    localStorage.clear();
    setLogoutStatus(true);
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
    <header id='header'>
      <div className='header__main'>
        <Link className='header__logo' to='/'>
          <img src={ballersLogo} alt="The Ballers' Logo" />
        </Link>
        <a className='header--burger-menu' onClick={menuDisplay}>
          <img src={burgerMenuIcon} alt='Menu' />
        </a>
      </div>
      <nav className='nav' id='nav'>
        <ul className='nav__list'>
          <li className='nav__list--item'>
            <Link to='/news'>News</Link>
          </li>
          <li className='nav__list--item'>
            <Link to='/tournaments'>Tournaments</Link>
          </li>
          <li className='nav__list--item'>
            <Link to='/clubs'>Clubs</Link>
          </li>
          <li className='nav__list--item'>
            <Link to='/about'>About us</Link>
          </li>
          {localStorage.getItem('image') ? (
            <li className='nav__list--image'>
              <a onClick={adminDisplay}>
                <img src={localStorage.getItem('image')} alt="User's profile pic" />
              </a>
            </li>
          ) : (
            <li className='nav__list--item nav__list--image'>
              <a onClick={adminDisplay}>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 499.14 499.14'>
                  <path
                    d='M250,.21C112.17.21.43,112,.43,249.79S112.17,499.36,250,499.36,499.57,387.62,499.57,249.79,387.83.21,250,.21Zm0,67.39a83.34,83.34,0,1,1-83.33,83.33A83.33,83.33,0,0,1,250,67.6Zm-1.25,382c-78.18,0-161.29-50.06-157.6-87.83,3.67-37.5,92.75-61.27,157.6-61.27s153.93,23.77,157.6,61.27C410,399.49,326.93,449.55,248.75,449.55Z'
                    transform='translate(-0.43 -0.21)'
                  />
                </svg>
              </a>
            </li>
          )}
          <div className='admin-nav' id='admin-nav'>
            {localStorage.getItem('slug') ? (
              <>
                <li className='nav__list--item'>
                  <Link to='/profile'>Profile</Link>
                </li>
                <li className='nav__list--item'>
                  <Link to='/admins'>Admins</Link>
                </li>
              </>
            ) : null}

            {localStorage.getItem('slug') ? (
              <li className='nav__list--item'>
                <Link to='/login' onClick={logout}>
                  Logout
                </Link>
              </li>
            ) : (
              <li className='nav__list--item'>
                <Link to='/login'>Login</Link>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
