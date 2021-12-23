import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Cookie from 'js-cookie';
import Message from '../components/Message';
import ButtonContainer from './ButtonContainer';
import ImageUploader from '../utils/functions/ImageUploader';
import updateThumbnail from '../utils/functions/updateThumbnail';
import { authConfig, cookieConfig } from '../utils/constants';
import { envConfig } from '../utils/config';
import '../assets/styles/components/CreateEntity.scss';

const CreateAdmin = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Nuevo Administrador';
    window.scrollTo(0, 0);

    // Select closest container for the input
    document.querySelectorAll('.form__image--input').forEach((inputElement) => {
      const dropZoneElement = inputElement.closest('.form__image');

      /**
       * Updates the image thumbnail after change is detected in the
       * image drop zone
       */
      inputElement.addEventListener('change', (e) => {
        if (inputElement.files.length) {
          updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
      });

      /**
       * Event listener when file is being dragged over the drop zone
       * Activates CSS indicator to let the user know that they have
       * dragged the item over the drop zone
       */
      dropZoneElement.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZoneElement.classList.add('drop-zone__over');
      });

      /**
       * Event listener when the file isn't being dragged
       */
      ['dragleave', 'dragend'].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
          dropZoneElement.classList.remove('drop-zone__over');
        });
      });
    });
  }, []);

  /**
   * Re assigns the form image value after a storage event
   * has been dispatched, which means that an image has been
   * uploaded to the app
   */
  window.onstorage = () => {
    // form.image = localStorage.getItem('uploaded image');
    form.image = Cookie.get('uploaded image');
  };

  /**
   * Sets the initial values for the form fields
   */
  const [form, setValues] = useState({
    name: '',
    email: '',
    password: '',
    // image: localStorage.getItem('actor image'),
    image: Cookie.get('actor image'),
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
   * with the data entered by the user in a form along
   * with a bearer token included in the headers configuration
   * @param {*} url - API URL
   * @param {*} data - body data to post
   * @param {*} config - headers configuration
   */
  const addAdmin = async (url, data, config) => {
    await axios
      .post(url, data, config)
      .then((res) => {
        ReactDOM.render(
          <Message
            message='¡Administrador registrado con éxito!'
            messageStatus='success'
          />,
          document.getElementById('message-container')
        );

        // localStorage.removeItem('uploaded image');
        Cookie.remove('uploaded image');
      })
      .catch((error) => {
        ReactDOM.render(
          <Message
            message='¡Ups!, Hubo un error al registrar el administrador'
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );

        // localStorage.removeItem('uploaded image');
        Cookie.remove('uploaded image');
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addAdmin(`${envConfig.apiUrl}/admins`, form, authConfig);
  };

  return (
    <>
      <div id='message-container'></div>

      <main className='create-container'>
        <form className='form' autoComplete='off' onSubmit={handleSubmit}>
          <h1 className='form--title'>Agregar Nuevo Administrador</h1>
          <input
            className='input'
            name='name'
            type='text'
            placeholder='Nombre *'
            autoComplete='off'
            required
            onChange={handleInput}
          />
          <input
            className='input'
            name='email'
            type='email'
            placeholder='Correo electrónico *'
            autoComplete='off'
            required
            onChange={handleInput}
          />
          <input
            className='input'
            name='password'
            type='password'
            placeholder='Contraseña *'
            autoComplete='off'
            minLength='8'
            required
            onChange={handleInput}
          />

          <label className='form--label label' htmlFor='file'>
            Foto del Administrador
          </label>
          <div className='form__image form__image-square' id='drop-zone'>
            <input
              className='form__image--input form__image-square--input'
              type='file'
              id='file'
              accept='image/*'
            />
            <div className='form__image-labels form__image-square-labels'>
              <span
                className='
                form__image--label form__image-square--label
                drop-zone--prompt
              '
              >
                Arrastra una imagen
              </span>
              <span
                className='
                form__image--label-button form__image-square--label-button
                drop-zone--prompt
              '
              >
                O haz clic aquí para subir una imagen
              </span>
            </div>
          </div>
          <ButtonContainer>
            <button type='submit' className='button yellow-button'>
              Agregar Administrador
            </button>
          </ButtonContainer>
        </form>
      </main>

      <ImageUploader />
    </>
  );
};

export default CreateAdmin;
