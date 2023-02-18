import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Message from '@components/Message';
import DangerButton from '@components/DangerButton';
import DeleteMessage from '@components/DeleteMessage';
import ButtonContainer from '@containers/ButtonContainer';
import toggleMessage from '@functions/toggleMessage';
import updateThumbnail from '@functions/updateThumbnail';
import { authConfig } from '@constants';
import { envConfig } from '@config';
import '@styles/CreateEntity.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the edit team page with all its functions
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const EditTeam = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Editar Equipo';
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
    form.logo = localStorage.getItem('uploaded image');

    ReactDOM.render(
      <Message message='Subiendo imagen' messageStatus='upload' />,
      document.getElementById('message-container')
    );
    setTimeout(() => {
      ReactDOM.render(
        <Message message='Se ha subido la imagen' messageStatus='success' />,
        document.getElementById('message-container')
      );
    }, 1500);
  };

  /**
   * Sets the initial values for the form fields
   */
  const [form, setValues] = useState({});

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
   * Sends a patch request to the URL of the API provided
   * with the data entered by the user in a form along
   * with a bearer token included in the headers configuration
   * @param {string} url - API URL
   * @param {json} data - body data to post
   * @param {json} config - headers configuration
   */
  const editTeam = async (url, data, config) => {
    await axios
      .patch(url, data, config)
      .then((res) => {
        ReactDOM.render(
          <Message
            message='¡Equipo editado con éxito!'
            messageStatus='success'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      })
      .catch((error) => {
        ReactDOM.render(
          <Message
            message={`¡Ups!, Hubo un error al editar el equipo. 
            Verifique los datos que haya ingresado`}
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      });
  };

  /**
   * Sends a delete request to the URL of the API provided
   * to delete the selected team according to its id along
   * with a bearer token included in the headers configuration
   * @param {string} url - API URL
   * @param {json} config - headers configuration
   */
  const deleteTeam = async (url, config) => {
    await axios
      .delete(url, config)
      .then((res) => {
        toggleMessage();
        ReactDOM.render(
          <Message
            message='¡Equipo eliminado con éxito!'
            messageStatus='success'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      })
      .catch((error) => {
        toggleMessage();
        ReactDOM.render(
          <Message
            message={`¡Ups!, Hubo un error al eliminar el equipo. 
            Inténtelo más tarde`}
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editTeam(
      `${envConfig.apiUrl}/equipos/${localStorage.getItem('selected team')}`,
      form,
      authConfig
    );
  };

  const handleDelete = () => {
    deleteTeam(
      `${envConfig.apiUrl}/equipos/${localStorage.getItem('selected team')}`,
      authConfig
    );
  };

  return (
    <>
      <div id='message-container'></div>

      <DeleteMessage entity='equipo' onClick={handleDelete} />

      <main className='create-container'>
        <form className='form' onSubmit={handleSubmit}>
          <h1 className='form--title'>Editar Equipo</h1>
          <input
            className='input'
            name='name'
            type='text'
            placeholder='Nombre'
            onChange={handleInput}
          />
          <input
            className='input'
            name='manager'
            type='text'
            placeholder='Nombre del manager'
            onChange={handleInput}
          />

          <label className='form--label label' htmlFor='file'>
            Logo del equipo
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
            <button type='submit' className='button primary-button'>
              Guardar Cambios
            </button>
            <DangerButton name='Eliminar Equipo' onClick={toggleMessage} />
          </ButtonContainer>
        </form>
      </main>
    </>
  );
};

export default EditTeam;
