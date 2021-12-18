import React, { useEffect } from 'react';
import ButtonContainer from './ButtonContainer';
import YellowButton from '../components/YellowButton';
import ImageUploader from '../functions/ImageUploader';
import axios from 'axios';
import '../assets/styles/components/CreateEntity.scss';
import updateThumbnail from '../functions/updateThumbnail';

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

      <ImageUploader />
    </>
  );
};

export default CreateAdmin;
