import React, { useEffect } from 'react';
import ButtonContainer from './ButtonContainer.jsx';
import YellowButton from '../components/YellowButton.jsx';
import RedButton from '../components/RedButton.jsx';
import '../assets/styles/components/CreateEntity.scss';

const EditAdmin = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Editar Administrador';
    window.scrollTo(0, 0);

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
        <h1 className='form--title'>Editar Administrador</h1>
        <input
          className='input'
          type='text'
          placeholder='Nombre *'
          required
        />
        <input
          className='input'
          type='email'
          placeholder='Correo electrónico *'
          required
        />
        <input
          className='input'
          type='password'
          placeholder='Contraseña *'
          required
        />

        <label className='form--label label' htmlFor='file'>
          Foto del Administrador
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
          <YellowButton name='Guardar Cambios' />
          <RedButton name='Eliminar Administrador' />
        </ButtonContainer>
      </form>
    </main>
  );
};

export default EditAdmin;
