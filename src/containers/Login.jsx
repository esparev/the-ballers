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
  // Sets the initial values for the form fields
  const [form, setValues] = useState({ email: '', password: '' });

  useEffect(() => {
    document.title = 'Login • The Ballers';
    window.scrollTo(0, 0);
  }, []);

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
        localStorage.setItem('slug', res.data.admin.slug);
        localStorage.setItem('name', res.data.admin.name);
        localStorage.setItem('email', res.data.admin.email);
        localStorage.setItem('image', res.data.admin.image);
        localStorage.setItem('role', res.data.admin.role);
        localStorage.setItem('token', res.data.token);
        window.location.href = '/';
      })
      .catch((error) => {
        if (error) {
          const wrongLogin = document.getElementById('wrong-login');
          wrongLogin.style.display = 'block';
        }
      });
  };

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(`${envConfig.apiUrl}/auth/login`, form);
  };

  return (
    <main className='login'>
      <div className='login__greet'>
        <h1 className='login__greet--title'>Log In</h1>
        <p className='login__greet--message'>Log in and start managing</p>
      </div>
      <form className='login__form' onSubmit={handleSubmit}>
        <div className='login__form--email'>
          <input
            className='login__form--input form--input-text'
            name='email'
            type='email'
            placeholder='Email'
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
            placeholder='Password'
            onChange={handleInput}
          />
          <span
            className='login__form--password-icon input-icon'
            id='password-icon'
            onClick={togglePassword}></span>
        </div>
        <div className='login__form-extras'>
          <div className='login__remember'>
            <input
              className='login__remember--checkbox'
              type='checkbox'
              name='remember'
              id='remember'
            />
            <span className='login--checkbox'></span>
            <label className='login__remember--text' htmlFor='remember'>
              Remember me
            </label>
          </div>
          <Link className='login--forgot-password' to='/change-password'>
            Forgot password?
          </Link>
        </div>
        <button type='submit' className='login__form--button'>
          Log In
        </button>
      </form>
    </main>
  );
};

export default Login;
