import React, { useEffect } from 'react';
import YellowButton from '../components/YellowButton.jsx';
import '../assets/styles/components/CreateNews.scss';

const CreateTournament = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Publicar Torneo';

    var elTxtA;
    var elIn;
    /**
     * Counts the characters that have been captured in the input
     */
    function countCharacters(e) {
      var textEnteredTxtA, currentTxtA, counterTxtA;
      var textEnteredIn, currentIn, counterIn;
      textEnteredTxtA = document.getElementById('textarea').value;
      textEnteredIn = document.getElementById('input').value;
      counterTxtA = textEnteredTxtA.length;
      counterIn = textEnteredIn.length;
      currentTxtA = document.getElementById('textarea-current');
      currentIn = document.getElementById('input-current');
      currentTxtA.textContent = counterTxtA;
      currentIn.textContent = counterIn;
    }
    elTxtA = document.getElementById('textarea');
    elTxtA.addEventListener('keyup', countCharacters, false);
    elIn = document.getElementById('input');
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

    /**
     * Updates thumbnail when the user has dragged and dropped the image
     * on the drop zone
     */
    function updateThumbnail(dropZoneElement, file) {
      let thumbnailElement =
        dropZoneElement.querySelectorAll('.drop-zone--thumb');

      if (dropZoneElement.querySelector('.drop-zone--prompt')) {
        dropZoneElement
          .querySelector('.form__image-labels')
          .classList.add('drop-zone--label');
        dropZoneElement.querySelector('.form__image--label').remove();
        dropZoneElement.querySelector('.form__image--label-button').remove();
      }

      if (thumbnailElement) {
        thumbnailElement = document.createElement('div');
        thumbnailElement.classList.add('drop-zone--thumb');
        dropZoneElement.appendChild(thumbnailElement);
      }

      // Show thumbnail for image file
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
          thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
      } else {
        thumbnailElement.style.backgroundImage = null;
      }
    }
  }, []);

  return (
    <main className='create-container'>
      <form className='form' action=''>
        <h1 className='form--title'>Publicar Nuevo Torneo</h1>
        <div>
          <input
            className='form--input-text'
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
            className='form--input-text'
            type='link'
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
          Portada del torneo
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

        <YellowButton name='Publicar Torneo' route='/torneos/torneo' />
      </form>
    </main>
  );
};

export default CreateTournament;
