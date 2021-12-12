import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginRequest } from '../actions';
import '../assets/styles/components/Login.scss';

const Login = (props) => {
  useEffect(() => {
    document.title = 'BEISMICH • Iniciar Sesión';
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [data, setData] = useState(null);

  // const login = () => {
  //   axios({
  //     method: 'post',
  //     data: {
  //       username: loginEmail,
  //       password: loginPassword,
  //     },
  //     withCredentials: true,
  //     url: 'https://beismich.herokuapp.com/api/v1/auth/iniciar-sesion',
  //   }).then((res) => console.log(res));
  // };

  // const getUser = () => {
  //   axios({
  //     method: 'get',
  //     withCredentials: true,
  //     url: 'https://beismich.herokuapp.com/api/v1/admins',
  //   }).then((res) => {
  //     setData(res.data);
  //     console.log(res.data);
  //   });
  // };

  // console.log(getUser);

  // const [form, setValues] = useState({
  //   email: '',
  // });

  // const handleInput = (event) => {
  //   setValues({
  //     ...form,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    const adminLogin = { email, password };

    fetch('https://beismich.herokuapp.com/api/v1/auth/iniciar-sesion', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': [
          'Origin',
          'X-Requested-With',
          'Content-Type',
          'Accept',
          'authorization',
        ],
        'Access-Control-Allow-Methods': [
          'PUT',
          'GET',
          'POST',
          'DELETE',
          'OPTIONS',
        ],
      },
      body: JSON.stringify(adminLogin),
      credentials: 'include',
    }).then(() => {
      console.log('Welcome back');
      console.log(adminLogin);
    });
    // props.loginRequest(form);
    // props.history.push('/');
  };

  const togglePassword = () => {
    var passwd = document.getElementById('password');
    var passwdIcon = document.getElementById('password-icon');
    if (passwd.type === 'password') {
      passwd.type = 'text';
      passwdIcon.classList.add('view-icon');
    } else {
      passwd.type = 'password';
      passwdIcon.classList.remove('view-icon');
    }
  };

  return (
    <div className='main-login'>
      <section className='greeting'>
        <h1 className='greeting--title'>Inicia Sesión</h1>
      </section>
      <section className='greeting-desktop'>
        <h1 className='greeting--title'>Bienvenido de Nuevo</h1>
      </section>

      <main className='login-main'>
        <section className='login'>
          <div className='login__greet'>
            <h2 className='login__greet--title'>Bienvenido de Nuevo</h2>
            <p className='login__greet--message'>
              ¡Hola!, inicia sesión para continuar
            </p>
          </div>
          <div className='login__greet-desktop'>
            <h2 className='login__greet--title'>Inicia Sesión</h2>
            <p className='login__greet--message'>
              ¡Hola!, inicia sesión para continuar
            </p>
          </div>
          <form className='login__form' onSubmit={handleSubmit}>
            <div className='login__form--email'>
              <input
                className='login__form--input form--input-text'
                name='email'
                type='email'
                placeholder='Correo electrónico'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='login__form--password'>
              <input
                className='login__form--input form--input-text'
                name='password'
                type='password'
                id='password'
                minLength='8'
                placeholder='Contraseña'
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className='login__form--password-icon input-icon'
                id='password-icon'
                onClick={togglePassword}
              ></span>
            </div>
            <button type='submit' className='login__form--button'>
              Iniciar Sesión
            </button>
          </form>
          <Link className='login--forgot-password' to='/recuperar-contraseña'>
            ¿Olvidaste tu contraseña?
          </Link>
        </section>
      </main>
    </div>
  );
};

const mapDispatchToProps = {
  loginRequest,
};

export default connect(null, mapDispatchToProps)(Login);
