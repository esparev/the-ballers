import React, { useEffect } from 'react';
import ButtonContainer from './ButtonContainer.jsx';
import YellowButton from '../components/YellowButton.jsx';
import '../assets/styles/components/CreateEntity.scss';
import countCharacters from '../functions/countCharacters.js';
import updateThumbnail from '../functions/updateThumbnail.js';

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
        <h1 className='form--title'>Publicar Nueva Noticia</h1>
        <div>
          <input
            className='input'
            type='text'
            id='input'
            placeholder='Titulo *'
            required
          />
          <div className='input-count' id='input-count'>
            <span id='input-current'>0</span>
            <span id='input-maximum'>/255</span>
          </div>
        </div>
        <div>
          <textarea
            className='input'
            type='text'
            id='textarea'
            name='textarea'
            placeholder='Descripción *'
            maxLength='255'
            required
          ></textarea>
          <div className='input-count' id='textarea-count'>
            <span id='textarea-current'>0</span>
            <span id='textarea-maximum'>/255</span>
          </div>
        </div>

        <label className='form--label label' htmlFor='file'>
          Portada de la noticia
        </label>
        <div className='form__image'>
          <input
            className='form__image--input'
            name='file'
            type='file'
            id='file'
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
          <YellowButton name='Publicar Noticia' route='/noticias/noticia' />
        </ButtonContainer>
      </form>
    </main>
  );
};

export default CreateNews;
