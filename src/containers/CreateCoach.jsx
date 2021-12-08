import React, { useEffect } from 'react';
import ButtonContainer from './ButtonContainer.jsx';
import YellowButton from '../components/YellowButton.jsx';
import '../assets/styles/components/CreateEntity.scss';
import updateThumbnail from '../functions/updateThumbnail.js';

const CreateCoach = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Nuevo Entrenador';
    window.scrollTo(0, 0);

    // Opaque date placeholder until it has been modified
    var dateEl = document.getElementById('date');
    dateEl.onchange = function () {
      if (dateEl.value === '') {
        dateEl.classList.add('empty');
      } else {
        dateEl.classList.remove('empty');
      }
    };

    // Select closest container for the input
    document.querySelectorAll('.form__image--input').forEach((inputElement) => {
      const dropZoneElement = inputElement.closest('.form__image');

      dropZoneElement.addEventListener('click', (e) => {
        inputElement.click();
      });

      inputElement.addEventListener('change', (e) => {
        if (inputElement.files.length) {
          updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
      });

      /* Event listener when file is being dragged over the drop zone
      Activates CSS indicator to let the user know that they have
      dragged the item over the drop zone  */
      dropZoneElement.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZoneElement.classList.add('drop-zone__over');
      });

      // Events
      ['dragleave', 'dragend'].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
          dropZoneElement.classList.remove('drop-zone__over');
        });
      });

      // Event listener after the file has been dropped on the drop zone
      dropZoneElement.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
          inputElement.files = e.dataTransfer.files;
          updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }

        dropZoneElement.classList.remove('drop-zone__over');
      });
    });
  }, []);

  return (
    <main className='create-container'>
      <form className='form' action=''>
        <h1 className='form--title'>Agregar Nuevo Entrenador</h1>
        <input
          className='input'
          type='text'
          placeholder='Nombre *'
          required
        />
        <label className='form--label label' htmlFor='date'>
          Fecha de nacimiento
        </label>
        <input
          className='input empty'
          type='date'
          id='date'
          placeholder='Fecha de nacimiento'
        />

        <label className='form--label label' htmlFor='file'>
          Foto del Entrenador
        </label>
        <div className='form__image form__image-square'>
          <input
            className='form__image--input form__image-square--input'
            type='file'
            id='file'
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
          <YellowButton name='Agregar Entrenador' />
        </ButtonContainer>
      </form>
    </main>
  );
};

export default CreateCoach;
