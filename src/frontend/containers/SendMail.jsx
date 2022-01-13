import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@styles/Login.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the send password recovery mail page with 
 * all its functions stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const SendMail = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Correo Enviado';
  }, []);

  return (
    <div className='main-login'>
      <section className='greeting'>
        <h1 className='greeting--title'>Se ha enviado el correo</h1>
      </section>
      <section className='greeting-desktop'>
        <h1 className='greeting--title'>¡Correo Enviado!</h1>
      </section>

      <main className='login-main'>
        <section className='login'>
          <div className='login__greet'>
            <h2 className='login__greet--title'>¡Correo Enviado!</h2>
            <p className='login__greet--message'>
              Revisa la bandeja de tu correo para cambiar tu contraseña
            </p>
          </div>
          <div className='login__greet-desktop'>
            <h2 className='login__greet--title'>Se ha enviado el correo</h2>
            <p className='login__greet--message'>
              Revisa la bandeja de tu correo para cambiar tu contraseña
            </p>
          </div>
          <form className='login__form' action=''>
            <button className='login__form--button'>
              <Link to='/iniciar-sesion'>Iniciar sesión</Link>
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default SendMail;
