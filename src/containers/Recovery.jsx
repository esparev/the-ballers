import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Message from '@components/Message';
import { envConfig } from '@config';
import '@styles/Login.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the recover password page with all its functions
 * stored inside for its full operation
 */
const Recovery = () => {
  // Sets the initial values for the form fields
  const [form, setValues] = useState({ email: '' });

  useEffect(() => {
    document.title = 'Recover Password • The Ballers';
  }, []);

  /**
   * Sends a post request to the URL of the API provided
   * with the data entered by the user in a form to recover
   * the admin's password sending an mail to his email address
   * @param {string} url - API URL
   * @param {json} data - body data to post
   */
  const sendMail = async (url, data) => {
    await axios
      .post(url, data)
      .then((res) => {
        window.location.href = '/#/send-mail';
      })
      .catch((error) => {
        ReactDOM.render(
          <Message
            message={`Ups!, There was an error sending the email.
            Verify that the email is correct`}
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );
      });
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMail(`${envConfig.apiUrl}/auth/recover`, form);
  };

  return (
    <>
      <div id='message-container'></div>

      <main className='login'>
        <section className='login'>
          <div className='login__greet'>
            <h2 className='login__greet--title'>Forgot Password</h2>
            <p className='login__greet--message'>Enter your email to recover your password</p>
          </div>
          <form className='login__form' onSubmit={handleSubmit}>
            <div className='login__form--email'>
              <input
                className='login__form--input form--input-text'
                name='email'
                type='email'
                placeholder='Email'
                required
                onChange={handleInput}
              />
            </div>
            <button type='submit' className='login__form--button'>
              <Link to='/send-mail'>Send mail</Link>
            </button>
          </form>
          <Link className='login--forgot-password' to='/login'>
            Back to login
          </Link>
        </section>
      </main>
    </>
  );
};

export default Recovery;
