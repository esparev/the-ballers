import React, { useEffect } from 'react';
import '../assets/styles/components/Login.scss';

const ChangePassword = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Nueva Contraseña';
    // var matchMessage;

    // /**
    //  * Verifies if the passwords match
    //  */
    // const passwordsMatch = () => {
    //   var newPasswd = document.getElementById('new-password');
    //   var confirmPasswd = document.getElementById('confirm-password');

    //   if (confirmPasswd.value === '') {
    //     matchMessage = null;
    //   }
    //   if (confirmPasswd.value !== newPasswd.value) {
    //     console.log('malo');
    //     matchMessage = (
    //       <p className='password-mismatch'>Las contraseñas no coinciden</p>
    //     );
    //   } else {
    //     console.log('bueno');
    //     matchMessage = (
    //       <p className='password-match'>Las contraseñas coinciden</p>
    //     );
    //   }
    // };
    // confirmPasswd.addEventListener('keyup', passwordsMatch, false);
  }, []);

  /**
   * Toggles the password input type between password and type when pressed
   * on the eye icon
   */
  const togglePassword = () => {
    var newPasswd = document.getElementById('new-password');
    var confirmPasswd = document.getElementById('confirm-password');
    var newPasswdIcon = document.getElementById('new-password-icon');
    var confirmPasswdIcon = document.getElementById('confirm-password-icon');

    if (newPasswd.type === 'password') {
      newPasswd.type = 'text';
      newPasswdIcon.classList.add('new-view-icon');
    } else {
      newPasswd.type = 'password';
      newPasswdIcon.classList.remove('new-view-icon');
    }
    if (confirmPasswd.type === 'password') {
      confirmPasswd.type = 'text';
      confirmPasswdIcon.classList.add('confirm-view-icon');
    } else {
      confirmPasswd.type = 'password';
      confirmPasswdIcon.classList.remove('confirm-view-icon');
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
          <form className='login__form' action=''>
            <div className='login__form--password'>
              <input
                className='login__form--input form--input-text'
                type='password'
                id='new-password'
                minLength='8'
                placeholder='Nueva contraseña'
              />
              <span
                className='login__form--password-icon input-icon'
                id='new-password-icon'
                onClick={togglePassword}
              ></span>
            </div>
            <div className='login__form--password'>
              <input
                className='login__form--input form--input-text'
                type='password'
                id='confirm-password'
                minLength='8'
                placeholder='Confirmar nueva contraseña'
              />
              <span
                className='login__form--password-icon input-icon'
                id='confirm-password-icon'
                onClick={togglePassword}
              ></span>
            </div>
            {/* {matchMessage} */}
            <button className='login__form--button'>Confirmar</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ChangePassword;
