import React, { useEffect } from 'react';
import ButtonContainer from './ButtonContainer.jsx';
import YellowButton from '../components/YellowButton.jsx';
import { Helmet } from 'react-helmet';
import '../assets/styles/components/CreateEntity.scss';
import updateThumbnail from '../functions/updateThumbnail.js';

const CreateAdmin = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Nuevo Administrador';
    window.scrollTo(0, 0);

    // Select closest container for the input
    document.querySelectorAll('.form__image--input').forEach((inputElement) => {
      const dropZoneElement = inputElement.closest('.form__image');

      /**
       * Adds click event to the image drop zone
       */
      dropZoneElement.addEventListener('click', (e) => {
        inputElement.click();
      });

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
       * Events listener when the file isn't being drag
       */
      ['dragleave', 'dragend'].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
          dropZoneElement.classList.remove('drop-zone__over');
        });
      });

      // Event listener after the file has been dropped on the drop zone
      // dropZoneElement.addEventListener('drop', (e) => {
      //   e.preventDefault();

      //   if (e.dataTransfer.files.length) {
      //     inputElement.files = e.dataTransfer.files;
      //     updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      //   }

      //   dropZoneElement.classList.remove('drop-zone__over');
      // });
    });
  }, []);

  return (
    <>
      <main className='create-container'>
        <form className='form' action='' autoComplete='off'>
          <h1 className='form--title'>Agregar Nuevo Administrador</h1>
          <input
            className='input'
            type='text'
            placeholder='Nombre *'
            autoComplete='off'
            required
          />
          <input
            className='input'
            type='email'
            placeholder='Correo electrónico *'
            autoComplete='off'
            required
          />
          <input
            className='input'
            type='password'
            placeholder='Contraseña *'
            autoComplete='off'
            required
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
            <YellowButton name='Agregar Administrador' />
          </ButtonContainer>
        </form>
      </main>

      {/* Imgur Image Uploader API scripts */}
      <Helmet>
        <script
          defer
          src='https://cdn.jsdelivr.net/gh/esparev/imgur-uploader@6e81d570de9d3a9d8ca1f38c4daeee17edccf1e7/imgur.js'
          type='text/javascript'
        ></script>
        <script
          defer
          src='https://cdn.jsdelivr.net/gh/esparev/imgur-uploader@6e81d570de9d3a9d8ca1f38c4daeee17edccf1e7/upload.js'
          type='text/javascript'
        ></script>
      </Helmet>
    </>
  );
};

export default CreateAdmin;
