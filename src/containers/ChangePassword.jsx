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

  // Sets the initial values for the form fields
  const [form, setValues] = useState({ token: token, newPassword: '' });

  /**
   * Sets values after onChange event is
   * triggered on the indicated inputs
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
          <Message message='Your password has been changed!' messageStatus='success' />,
          document.getElementById('message-container')
        );
      })
      .catch((error) => {
        ReactDOM.render(
          <Message
            message='Ups!, There was an error changing your password.
            Enter a valid password'
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    changePassword(`${envConfig.apiUrl}/auth/change-password`, form);
  };

  return (
    <>
      <div id='message-container'></div>

      <main className='login'>
        <section className='login'>
          <div className='login__greet'>
            <h2 className='login__greet--title'>New Password</h2>
            <p className='login__greet--message'>Enter a new password for your account</p>
          </div>
          <form className='login__form' onSubmit={handleSubmit}>
            <div className='login__form--password'>
              <input
                className='login__form--input form--input-text'
                name='newPassword'
                type='password'
                id='password'
                minLength='8'
                placeholder='Password'
                required
                onChange={handleInput}
              />
              <span
                className='login__form--password-icon input-icon'
                id='password-icon'
                onClick={togglePassword}></span>
            </div>
            <button type='submit' className='login__form--button'>
              Change password
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default ChangePassword;
