import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Message from '../components/Message';
import ButtonContainer from './ButtonContainer';
import ImageUploader from '../functions/ImageUploader';
import axios from 'axios';
import '../assets/styles/components/CreateEntity.scss';
import countCharacters from '../functions/countCharacters';
import updateThumbnail from '../functions/updateThumbnail';

const API = 'https://beismich.herokuapp.com/api/v1';

const CreateNews = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Publicar Noticia';
    window.scrollTo(0, 0);

    var elTxtA = document.getElementById('textarea');
    var elIn = document.getElementById('input');

    elTxtA.addEventListener('keyup', countCharacters, false);
    elIn.addEventListener('keyup', countCharacters, false);

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
    form.cover = localStorage.getItem('uploaded image');
  };

  /**
   * Sets the initial values for the form fields
   */
  const [form, setValues] = useState({
    title: '',
    description: '',
    cover: localStorage.getItem('cover image'),
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

  /**
   * Sends a post request to the URL of the API provided
   * with the data entered by the user in a form along
   * with a bearer token included in the headers configuration
   * @param {*} url - API URL
   * @param {*} data - body data to post
   * @param {*} config - headers configuration
   */
  const addNews = async (url, data, config) => {
    await axios
      .post(url, data, config)
      .then((res) => {
        ReactDOM.render(
          <Message
            message='¡Noticia publicada con éxito!'
            messageStatus='success'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      })
      .catch((error) => {
        console.log(error);
        console.log(form);

        ReactDOM.render(
          <Message
            message='¡Ups!, Hubo un error al publicar la noticia'
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addNews(`${API}/noticias`, form, config);
  };

  return (
    <>
      <div id='message-container'></div>

      <main className='create-container'>
        <form className='form' onSubmit={handleSubmit}>
          <h1 className='form--title'>Publicar Nueva Noticia</h1>
          <div>
            <input
              className='input'
              name='title'
              type='text'
              id='input'
              placeholder='Titulo *'
              required
              onChange={handleInput}
            />
            <div className='input-count' id='input-count'>
              <span id='input-current'>0</span>
              <span id='input-maximum'>/255</span>
            </div>
          </div>
          <div>
            <textarea
              className='input'
              name='description'
              type='text'
              id='textarea'
              placeholder='Descripción *'
              maxLength='1000'
              required
              onChange={handleInput}
            ></textarea>
            <div className='input-count' id='textarea-count'>
              <span id='textarea-current'>0</span>
              <span id='textarea-maximum'>/1000</span>
            </div>
          </div>

          <label className='form--label label' htmlFor='file'>
            Portada de la noticia
          </label>
          <div className='form__image' id='drop-zone'>
            <input
              className='form__image--input'
              type='file'
              id='file'
              accept='image/*'
            />
            <div className='form__image-labels'>
              <span className='form__image--label drop-zone--prompt'>
                Arrastra una imagen
              </span>
              <span className='form__image--label-button drop-zone--prompt'>
                O haz clic aquí para subir una imagen
              </span>
            </div>
          </div>

          <ButtonContainer>
            <button type='submit' className='button yellow-button'>
              Publicar Noticia
            </button>
          </ButtonContainer>
        </form>
      </main>

      <ImageUploader />
    </>
  );
};

export default CreateNews;
