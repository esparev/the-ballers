import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Message from '@components/Message';
import togglePassword from '@functions/togglePassword';
import { envConfig } from '@config';
import '@styles/Login.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the change password page with all its functions
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const ChangePassword = () => {
  // Gets the full URL string
  const search = useLocation().search;
  // Retrieves the value of the query param from the URL
  const token = new URLSearchParams(search).get('token');

  /**
   * Sets the initial values for the form fields
   */
  const [form, setValues] = useState({
    token: token,
    newPassword: '',
  });

  /**
   * Sets values after onChange event is triggered on the
   * indicated inputs
   */
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    document.title = 'New Password • The Ballers';
    window.scrollTo(0, 0);
  }, []);

  /**
   * Sends a post request to the URL of the API provided
   * with the data entered by the user in a form to recover
   * the admin's password sending an mail to his email address
   * @param {string} url - API URL
   * @param {json} data - body data to post
   */
  const changePassword = async (url, data) => {
    await axios
      .post(url, data)
      .then((res) => {
        ReactDOM.render(
          <Message
            message='¡Se ha cambiado tu contraseña!'
            messageStatus='success'
          />,
          document.getElementById('message-container')
        );
      })
      .catch((error) => {
        ReactDOM.render(
          <Message
            message='¡Ups!, Hubo un error al cambiar la contraseña. Ingrese una contraseña válida'
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    changePassword(`${envConfig.apiUrl}/auth/cambiar-contra`, form);
  };

  return (
    <>
      <div id='message-container'></div>

      <div className='main-login'>
        <section className='greeting'>
          <h1 className='greeting--title'>Crea una Nueva Contraseña</h1>
        </section>
        <section className='greeting-desktop'>
          <h1 className='greeting--title'>Nueva Contraseña</h1>
        </section>

        <main className='login-main'>
          <section className='login'>
            <div className='login__greet'>
              <h2 className='login__greet--title'>Nueva Contraseña</h2>
              <p className='login__greet--message'>
                Ingrese una nueva contraseña para su cuenta
              </p>
            </div>
            <div className='login__greet-desktop'>
              <h2 className='login__greet--title'>Crea una Nueva Contraseña</h2>
              <p className='login__greet--message'>
                Ingrese una nueva contraseña para su cuenta
              </p>
            </div>
            <form className='login__form' onSubmit={handleSubmit}>
              <div className='login__form--password'>
                <input
                  className='login__form--input form--input-text'
                  name='newPassword'
                  type='password'
                  id='password'
                  minLength='8'
                  placeholder='Nueva contraseña'
                  required
                  onChange={handleInput}
                />
                <span
                  className='login__form--password-icon input-icon'
                  id='password-icon'
                  onClick={togglePassword}
                ></span>
              </div>
              <button type='submit' className='login__form--button'>
                Confirmar
              </button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
};

export default ChangePassword;
