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
    document.title = 'Email Sent • The Ballers';
  }, []);

  return (
    <main className='login'>
      <section className='login'>
        <div className='login__greet'>
          <h2 className='login__greet--title'>Email Sent!</h2>
          <p className='login__greet--message'>Check your inbox to change your password</p>
        </div>
        <form className='login__form'>
          <button className='login__form--button'>
            <Link to='/login'>Back to login</Link>
          </button>
        </form>
      </section>
    </main>
  );
};

export default SendMail;
