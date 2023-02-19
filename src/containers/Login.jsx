import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import togglePassword from '@functions/togglePassword';
import { envConfig } from '@config';
import '@styles/Login.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the login page with all its functions
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const Login = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Iniciar Sesión';
    window.scrollTo(0, 0);
  }, []);

  const [form, setValues] = useState({
    email: '',
    password: '',
  });

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  /**
   * Sends a post request to the URL of the API provided
   * with the data entered by the user in a form
   * @param {string} url - API URL
   * @param {json} data - body data to post
   */
  const login = async (url, data) => {
    await axios
      .post(url, data)
      .then((res) => {
        // Setting various data from the admin's credential
        // to serve data persistency on local storage for
        // the admin's use and experience
        localStorage.setItem('id', res.data.admin.id);
        localStorage.setItem('name', res.data.admin.name);
        localStorage.setItem('email', res.data.admin.email);
        localStorage.setItem('image', res.data.admin.image);
        localStorage.setItem('role', res.data.admin.role);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('actor image', 'https://i.imgur.com/CFJ2k8J.png');
        localStorage.setItem('league logo', 'https://i.imgur.com/PEZQ6jS.png');
        localStorage.setItem('team logo', 'https://i.imgur.com/chid3RN.png');
        window.location.href = '/';
      })
      .catch((error) => {
        if (error) {
          const wrongLogin = document.getElementById('wrong-login');
          wrongLogin.style.display = 'block';
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(`${envConfig.apiUrl}/auth/iniciar-sesion`, form);
  };

  return (
    <div className='main-login'>
      <section className='greeting'>
        <h1 className='greeting--title'>Inicia Sesión</h1>
      </section>
      <section className='greeting-desktop'>
        <h1 className='greeting--title'>Bienvenido de Nuevo</h1>
      </section>

      <main className='login-main'>
        <section className='login'>
          <div className='login__greet'>
            <h2 className='login__greet--title'>Bienvenido de Nuevo</h2>
            <p className='login__greet--message'>
              ¡Hola!, inicia sesión para continuar
            </p>
          </div>
          <div className='login__greet-desktop'>
            <h2 className='login__greet--title'>Inicia Sesión</h2>
            <p className='login__greet--message'>
              ¡Hola!, inicia sesión para continuar
            </p>
          </div>
          <form className='login__form' onSubmit={handleSubmit}>
            <div className='login__form--email'>
              <input
                className='login__form--input form--input-text'
                name='email'
                type='email'
                placeholder='Correo electrónico'
                onChange={handleInput}
              />
            </div>
            <div className='login__form--password'>
              <input
                className='login__form--input form--input-text'
                name='password'
                type='password'
                id='password'
                minLength='8'
                placeholder='Contraseña'
                onChange={handleInput}
              />
              <span
                className='login__form--password-icon input-icon'
                id='password-icon'
                onClick={togglePassword}
              ></span>
            </div>
            <button type='submit' className='login__form--button'>
              Iniciar Sesión
            </button>
          </form>
          <Link className='login--forgot-password' to='/change-password'>
            ¿Olvidaste tu contraseña?
          </Link>
          <p className='login--wrong-login' id='wrong-login'>
            El correo o la contraseña son incorrectos, intente nuevamente
          </p>
        </section>
      </main>
    </div>
  );
};

export default Login;
