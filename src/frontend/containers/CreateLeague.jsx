import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import set from 'lodash/set';
import Message from '../components/Message';
import ButtonContainer from './ButtonContainer';
import ImageUploader from '../utils/functions/ImageUploader';
import updateThumbnail from '../utils/functions/updateThumbnail';
import { authConfig } from '../utils/constants';
import { envConfig } from '../utils/config';
import '../assets/styles/components/CreateEntity.scss';

const CreateLeague = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Nueva Liga';
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
   * Sets the initial values for the league fields
   */
  const [form, setValues] = useState({
    name: '',
    responsable: '',
    phone: '',
    ageStart: 0,
    ageEnd: 0,
    logo: localStorage.getItem('league logo'),
    address: {
      streetName: '',
      streetNumber: '',
      zipCode: '',
      suburb: '',
      location: '',
    },
  });

  /**
   * Sets values after onChange event is triggered on the
   * indicated inputs
   */
  const handleInput = (event) => {
    const formCopy = JSON.parse(JSON.stringify(form));
    set(formCopy, event.target.name, event.target.value);
    setValues(formCopy);
  };

  /**
   * Sends a post request to the URL of the API provided
   * with the data entered by the user in a form along
   * with a bearer token included in the headers configuration
   * @param {*} url - API URL
   * @param {*} data - body data to post
   * @param {*} config - headers configuration
   */
  const addLeague = async (url, data, config) => {
    await axios
      .post(url, data, config)
      .then((res) => {
        console.log('FORM', form);

        ReactDOM.render(
          <Message
            message='Liga registrada con éxito!'
            messageStatus='success'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      })
      .catch((error) => {
        console.log('ERROR', error);
        console.log('FORM', form);

        ReactDOM.render(
          <Message
            message={`¡Ups!, Hubo un error al registrar la liga. 
            Verifique que haya llenado los campos necesarios`}
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addLeague(`${envConfig.apiUrl}/ligas`, form, authConfig);
  };

  return (
    <>
      <div id='message-container'></div>

      <main className='create-container'>
        <form className='form' onSubmit={handleSubmit}>
          <h1 className='form--title'>Agregar Nueva Liga</h1>
          <input
            className='input'
            name='name'
            type='text'
            placeholder='Nombre *'
            required
            onChange={handleInput}
          />
          <input
            className='input'
            name='responsable'
            type='text'
            required
            placeholder='Nombre del responsable *'
            onChange={handleInput}
          />
          <input
            className='input'
            name='phone'
            type='num'
            maxLength='10'
            placeholder='Teléfono del responsable'
            onChange={handleInput}
          />
          <select
            className='input empty'
            name='address.location'
            id='location'
            onChange={handleInput}
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
            name='address.streetName'
            type='text'
            placeholder='Calle *'
            required
            onChange={handleInput}
          />
          <input
            className='input'
            name='address.streetNumber'
            type='text'
            placeholder='Número *'
            required
            onChange={handleInput}
          />
          <input
            className='input'
            name='address.zipCode'
            type='text'
            maxLength='5'
            placeholder='C.P. *'
            required
            onChange={handleInput}
          />
          <input
            className='input'
            name='address.suburb'
            type='text'
            placeholder='Colonia *'
            required
            onChange={handleInput}
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
              onChange={handleInput}
            />
            <label className='label'>hasta</label>
            <input
              className='input input-age'
              name='ageEnd'
              type='tel'
              maxLength='2'
              placeholder='00'
              onChange={handleInput}
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
              Agregar Liga
            </button>
          </ButtonContainer>
        </form>
      </main>

      <ImageUploader />
    </>
  );
};

export default CreateLeague;
