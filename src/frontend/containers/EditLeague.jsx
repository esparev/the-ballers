import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Message from '../components/Message';
import ButtonContainer from './ButtonContainer';
import RedButton from '../components/RedButton';
import DeleteMessage from '../components/DeleteMessage';
import toggleMessage from '../utils/functions/toggleMessage';
import updateThumbnail from '../utils/functions/updateThumbnail';
import { authConfig } from '../utils/constants';
import { envConfig } from '../utils/config';
import '../assets/styles/components/CreateEntity.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the edit league page with all its functions
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const EditLeague = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Editar Liga';
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
    leagueForm.logo = localStorage.getItem('uploaded image');

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
   * Sets the initial values for the league fields
   */
  const [leagueForm, setLeagueValues] = useState({});
  const [addressForm, setAddressValues] = useState({});

  /**
   * Sets values after onChange event is triggered on the
   * indicated inputs
   */
  const handleLeagueInput = (event) => {
    setLeagueValues({
      ...leagueForm,
      [event.target.name]: event.target.value,
    });
  };
  const handleAddressInput = (event) => {
    setAddressValues({
      ...addressForm,
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
  const editLeague = async (url, data, config) => {
    await axios
      .patch(url, data, config)
      .then((res) => {
        ReactDOM.render(
          <Message
            message='¡Liga editada con éxito!'
            messageStatus='success'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      })
      .catch((error) => {
        ReactDOM.render(
          <Message
            message={`¡Ups!, Hubo un error al editar la liga. 
            Verifique los datos que haya ingresado`}
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
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
  const editAddress = async (url, data, config) => {
    await axios
      .patch(url, data, config)
      .then((res) => {
        ReactDOM.render(
          <Message
            message='¡Liga editada con éxito!'
            messageStatus='success'
          />,
          document.getElementById('message-container')
        );
      })
      .catch((error) => {
        ReactDOM.render(
          <Message
            message={`¡Ups!, Hubo un error al editar la dirección de la liga. 
            Verifique los datos que haya ingresado`}
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );
      });
  };

  /**
   * Sends a delete request to the URL of the API provided
   * to delete the selected league according to its id along
   * with a bearer token included in the headers configuration
   * @param {string} url - API URL
   * @param {json} config - headers configuration
   */
  const deleteLeague = async (url, config) => {
    await axios
      .delete(url, config)
      .then((res) => {
        toggleMessage();
        ReactDOM.render(
          <Message
            message='¡Liga eliminada con éxito!'
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
            message={`¡Ups!, Hubo un error al eliminar la liga. 
            Inténtelo más tarde`}
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      });
  };
  /**
   * Sends a delete request to the URL of the API provided
   * to delete the selected news according to its id along
   * with a bearer token included in the headers configuration
   * @param {string} url - API URL
   * @param {json} config - headers configuration
   */
  const deleteAddress = async (url, config) => {
    await axios
      .delete(url, config)
      .then((res) => {
        toggleMessage();
        ReactDOM.render(
          <Message
            message='¡Liga eliminada con éxito!'
            messageStatus='success'
          />,
          document.getElementById('message-container')
        );
      })
      .catch((error) => {
        toggleMessage();
        ReactDOM.render(
          <Message
            message={`¡Ups!, Hubo un error al eliminar la liga. 
            Inténtelo más tarde`}
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editLeague(
      `${envConfig.apiUrl}/ligas/${localStorage.getItem('selected league')}`,
      leagueForm,
      authConfig
    );
    editAddress(
      `${envConfig.apiUrl}/direcciones/${localStorage.getItem(
        'selected league'
      )}`,
      addressForm,
      authConfig
    );
  };

  const handleDelete = () => {
    deleteLeague(
      `${envConfig.apiUrl}/ligas/${localStorage.getItem('selected league')}`,
      authConfig
    );
    deleteAddress(
      `${envConfig.apiUrl}/direcciones/${localStorage.getItem(
        'selected league'
      )}`,
      authConfig
    );
  };

  return (
    <>
      <div id='message-container'></div>

      <DeleteMessage entity='liga' onClick={handleDelete} />

      <main className='create-container'>
        <form className='form' onSubmit={handleSubmit}>
          <h1 className='form--title'>Editar Liga</h1>
          <input
            className='input'
            name='name'
            type='text'
            placeholder='Nombre'
            onChange={handleLeagueInput}
          />
          <input
            className='input'
            name='responsable'
            type='text'
            placeholder='Nombre del responsable'
            onChange={handleLeagueInput}
          />
          <input
            className='input'
            name='phone'
            type='num'
            maxLength='10'
            placeholder='Teléfono del responsable'
            onChange={handleLeagueInput}
          />
          <select
            className='input empty'
            name='location'
            id='location'
            onChange={handleAddressInput}
          >
            <option defaultValue value=''>
              Localidad
            </option>
            <option value='Acuitzio'>Acuitzio</option>
            <option value='Aguililla'>Aguililla</option>
            <option value='Álvaro Obregón'>Álvaro Obregón</option>
            <option value='Angamacutiro'>Angamacutiro</option>
            <option value='Apatzingán'>Apatzingán</option>
            <option value='Ario'>Ario</option>
            <option value='Arteaga'>Arteaga</option>
            <option value='Buenavista'>Buenavista</option>
            <option value='Charo'>Charo</option>
            <option value='Chavinda'>Chavinda</option>
            <option value='Cherán'>Cherán</option>
            <option value='Chilchota'>Chilchota</option>
            <option value='Coahuayana'>Coahuayana</option>
            <option value='Coalcomán'>Coalcomán</option>
            <option value='Cojumatlán de Régules'>Cojumatlán de Régules</option>
            <option value='Cotija'>Cotija</option>
            <option value='Cuitzeo'>Cuitzeo</option>
            <option value='Gabriel Zamora'>Gabriel Zamora</option>
            <option value='Hidalgo'>Hidalgo</option>
            <option value='Huandacareo'>Huandacareo</option>
            <option value='Huetamo'>Huetamo</option>
            <option value='Indaparapeo'>Indaparapeo</option>
            <option value='Ixtlán'>Ixtlán</option>
            <option value='Jacona'>Jacona</option>
            <option value='Jiquilpan'>Jiquilpan</option>
            <option value='José Sixto Verduzco'>José Sixto Verduzco</option>
            <option value='Jungapeo'>Jungapeo</option>
            <option value='La Huacana'>La Huacana</option>
            <option value='La Piedad'>La Piedad</option>
            <option value='Lázaro Cárdenas'>Lázaro Cárdenas</option>
            <option value='Los Reyes'>Los Reyes</option>
            <option value='Madero'>Madero</option>
            <option value='Maravatío'>Maravatío</option>
            <option value='Marcos Castellanos'>Marcos Castellanos</option>
            <option value='Morelia'>Morelia</option>
            <option value='Múgica'>Múgica</option>
            <option value='Nahuatzen'>Nahuatzen</option>
            <option value='Nahuatzen'>Nahuatzen</option>
            <option value='Nuevo Parangaricutiro'>Nuevo Parangaricutiro</option>
            <option value='Pajacuarán'>Pajacuarán</option>
            <option value='Panindícuaro'>Panindícuaro</option>
            <option value='Paracho'>Paracho</option>
            <option value='Pátzcuaro'>Pátzcuaro</option>
            <option value='Peribán'>Peribán</option>
            <option value='Purépero'>Purépero</option>
            <option value='Purúandiro'>Purúandiro</option>
            <option value='Queréndaro'>Queréndaro</option>
            <option value='Quiroga'>Quiroga</option>
            <option value='Quiroga'>Quiroga</option>
            <option value='Sahuayo'>Sahuayo</option>
            <option value='Salvador Escalante'>Salvador Escalante</option>
            <option value='Santa Ana Maya'>Santa Ana Maya</option>
            <option value='Tacámbaro'>Tacámbaro</option>
            <option value='Tancítaro'>Tancítaro</option>
            <option value='Tangamandapio'>Tangamandapio</option>
            <option value='Tangancícuaro'>Tangancícuaro</option>
            <option value='Tanhuato'>Tanhuato</option>
            <option value='Taretan'>Taretan</option>
            <option value='Tarímbaro'>Tarímbaro</option>
            <option value='Tepalcatepec'>Tepalcatepec</option>
            <option value='Tingambato'>Tingambato</option>
            <option value='Tingüindín'>Tingüindín</option>
            <option value='Tocumbo'>Tocumbo</option>
            <option value='Turicato'>Turicato</option>
            <option value='Tuxpan'>Tuxpan</option>
            <option value='Uruapan'>Uruapan</option>
            <option value='Venustiano Carranza'>Venustiano Carranza</option>
            <option value='Vista Hermosa'>Vista Hermosa</option>
            <option value='Yurécuaro'>Yurécuaro</option>
            <option value='Zacapu'>Zacapu</option>
            <option value='Zamora'>Zamora</option>
            <option value='Zinapécuaro'>Zinapécuaro</option>
            <option value='Ziracuaretiro'>Ziracuaretiro</option>
            <option value='Zitácuaro'>Zitácuaro</option>
          </select>
          <label className='label'>Dirección</label>
          <input
            className='input'
            name='streetName'
            type='text'
            placeholder='Calle'
            onChange={handleAddressInput}
          />
          <input
            className='input'
            name='streetNumber'
            type='text'
            placeholder='Número'
            onChange={handleAddressInput}
          />
          <input
            className='input'
            name='zipCode'
            type='tel'
            maxLength='5'
            placeholder='C.P.'
            onChange={handleAddressInput}
          />
          <input
            className='input'
            type='text'
            name='suburb'
            placeholder='Colonia'
            onChange={handleAddressInput}
          />
          <label className='label'>Rango de edad</label>
          <div>
            <label className='label'>De</label>
            <input
              className='input input-age'
              name='ageStart'
              type='tel'
              maxLength='2'
              placeholder='00'
              onChange={handleLeagueInput}
            />
            <label className='label'>hasta</label>
            <input
              className='input input-age'
              name='ageEnd'
              type='tel'
              maxLength='2'
              placeholder='00'
              onChange={handleLeagueInput}
            />
            <label className='label'>años</label>
          </div>

          <label className='form--label label' htmlFor='file'>
            Logo de la liga
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
              Guardar Cambios
            </button>
            <RedButton name='Eliminar Liga' onClick={toggleMessage} />
          </ButtonContainer>
        </form>
      </main>
    </>
  );
};

export default EditLeague;
