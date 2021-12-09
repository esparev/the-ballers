import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Login.scss';

const Recovery = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Recuperar contraseña';
  }, []);

  const form = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      email: formData.get('email'),
    };
    console.log(data);
  };

  return (
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
          <form className='login__form' action=''>
            <div className='login__form--email'>
              <input
                className='login__form--input form--input-text'
                name='email'
                type='email'
                placeholder='Correo electrónico'
              />
            </div>
            <button
              type='submit'
              className='login__form--button'
              onClick={handleSubmit}
            >
              <Link to='/enviar-correo'>Enviar</Link>
            </button>
          </form>
          <Link className='login--forgot-password' to='/iniciar-sesion'>
            Regresar a inicio de sesión
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Recovery;
