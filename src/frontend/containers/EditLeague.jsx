import React, { useEffect } from 'react';
import ButtonContainer from './ButtonContainer.jsx';
import YellowButton from '../components/YellowButton.jsx';
import RedButton from '../components/RedButton.jsx';
import DeleteMessage from '../components/DeleteMessage.jsx';
import '../assets/styles/components/CreateEntity.scss';
import toggleMessage from '../functions/toggleMessage.js';
import updateThumbnail from '../functions/updateThumbnail.js';

const EditLeague = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Editar Liga';
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
  }, []);

  return (
    <>
      <DeleteMessage entity='liga' />

      <main className='create-container'>
        <form className='form' action=''>
          <h1 className='form--title'>Editar Liga</h1>
          <input
            className='input'
            type='text'
            placeholder='Nombre *'
            required
          />
          <input
            className='input'
            type='text'
            placeholder='Nombre del responsable'
          />
          <input
            className='input'
            type='num'
            maxLength='10'
            placeholder='Teléfono del responsable'
          />
          <select className='input empty' name='location' id='location'>
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
          <input className='input' type='text' placeholder='Calle' />
          <input
            className='input'
            type='tel'
            maxLength='5'
            placeholder='C.P.'
          />
          <input className='input' type='text' placeholder='Colonia' />
          <label className='label'>Rango de edad</label>
          <div>
            <label className='label'>De</label>
            <input
              className='input input-age'
              type='tel'
              maxLength='2'
              placeholder='00'
            />
            <label className='label'>hasta</label>
            <input
              className='input input-age'
              type='tel'
              maxLength='2'
              placeholder='00'
            />
            <label className='label'>años</label>
          </div>

          <label className='form--label label' htmlFor='file'>
            Logo de la liga
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
            <RedButton name='Eliminar Liga' onClick={toggleMessage} />
          </ButtonContainer>
        </form>
      </main>
    </>
  );
};

export default EditLeague;
