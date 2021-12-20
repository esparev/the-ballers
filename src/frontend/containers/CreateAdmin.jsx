import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Message from '../components/Message';
import ButtonContainer from './ButtonContainer';
import ImageUploader from '../functions/ImageUploader';
import axios from 'axios';
import '../assets/styles/components/CreateEntity.scss';
import updateThumbnail from '../functions/updateThumbnail';

const API = 'https://beismich.herokuapp.com/api/v1';

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
    form.image = localStorage.getItem('actor image');
  };

  /**
   * Sets the initial values for the form fields
   */
  const [form, setValues] = useState({
    name: '',
    email: '',
    password: '',
    image: localStorage.getItem('actor image'),
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
   * Authorization header configuration for API request
   */
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  const addAdmin = async (url, data, config) => {
    await axios
      .post(url, data, config)
      .then((res) => {
        console.log('res', res);
        console.log('FORM', form);
        ReactDOM.render(
          <Message
            message='¡Administrador registrado con exito!'
            messageStatus='success'
          />,
          document.getElementById('message-container')
        );
        // Changes the default actor image if its different from the default one
        if (
          localStorage.getItem('actor image') !==
          'https://i.imgur.com/CFJ2k8J.png'
        ) {
          localStorage.setItem(
            'actor image',
            'https://i.imgur.com/CFJ2k8J.png'
          );
        }
      })
      .catch((error) => {
        console.log('error', error);
        console.log('FORM', form);

        ReactDOM.render(
          <Message
            message='¡Ups!, Hubo un error al registrar el administrador'
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addAdmin(`${API}/admins`, form, config);
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
