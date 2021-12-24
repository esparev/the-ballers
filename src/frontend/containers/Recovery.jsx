import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { envConfig } from '../utils/config';
import '../assets/styles/components/Login.scss';

const Recovery = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Recuperar contraseña';
  }, []);

  /**
   * Sets the initial values for the form fields
   */
  const [form, setValues] = useState({
    email: '',
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

  /**
   * Sends a post request to the URL of the API provided
   * with the data entered by the user in a form to recover
   * the admin's password sending an mail to his email address
   * @param {*} url - API URL
   * @param {*} data - body data to post
   */
  const sendMail = async (url, data) => {
    await axios
      .post(url, data)
      .then((res) => {
        window.location.href = '/#/enviar-correo';
      })
      .catch((error) => {
        ReactDOM.render(
          <Message
            message='¡Ups!, Hubo un error al enviar el correo'
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMail(`${envConfig.apiUrl}/auth/recuperar`, form);
  };

  return (
    <>
      <div id='message-container'></div>

      <div className='main-login'>
        <section className='greeting'>
          <h1 className='greeting--title'>Recupera tu contraseña</h1>
        </section>
        <section className='greeting-desktop'>
          <h1 className='greeting--title'>Olvidaste tu Contraseña</h1>
        </section>

        <main className='login-main'>
          <section className='login'>
            <div className='login__greet'>
              <h2 className='login__greet--title'>Olvidaste tu Contraseña</h2>
              <p className='login__greet--message'>
                Ingresa el correo electrónico para recuperar tu contraseña
              </p>
            </div>
            <div className='login__greet-desktop'>
              <h2 className='login__greet--title'>Recupera tu contraseña</h2>
              <p className='login__greet--message'>
                Ingresa el correo electrónico para recuperar tu contraseña
              </p>
            </div>
            <form className='login__form' onSubmit={handleSubmit}>
              <div className='login__form--email'>
                <input
                  className='login__form--input form--input-text'
                  name='email'
                  type='email'
                  placeholder='Correo electrónico'
                  required
                  onChange={handleInput}
                />
              </div>
              <button type='submit' className='login__form--button'>
                <Link to='/enviar-correo'>Enviar</Link>
              </button>
            </form>
            <Link className='login--forgot-password' to='/iniciar-sesion'>
              Regresar a inicio de sesión
            </Link>
          </section>
        </main>
      </div>
    </>
  );
};

export default Recovery;
