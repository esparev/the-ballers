import React, { useEffect, useRef } from 'react';
import '../assets/styles/components/Login.scss';

const ChangePassword = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Nueva Contraseña';
  }, []);

  const form = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      password: formData.get('password'),
    };
    console.log(data);
  };

  /**
   * Toggles the password input type between password and type when pressed
   * on the eye icon
   */
  const togglePassword = () => {
    var passwd = document.getElementById('password');
    var passwdIcon = document.getElementById('password-icon');

    if (passwd.type === 'password') {
      passwd.type = 'text';
      passwdIcon.classList.add('new-view-icon');
    } else {
      passwd.type = 'password';
      passwdIcon.classList.remove('new-view-icon');
    }
  };

  return (
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
          <form className='login__form' ref={form}>
            <div className='login__form--password'>
              <input
                className='login__form--input form--input-text'
                type='password'
                id='password'
                minLength='8'
                placeholder='Nueva contraseña'
              />
              <span
                className='login__form--password-icon input-icon'
                id='password-icon'
                onClick={togglePassword}
              ></span>
            </div>
            <button
              type='submit'
              className='login__form--button'
              onClick={handleSubmit}
            >
              Confirmar
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ChangePassword;
