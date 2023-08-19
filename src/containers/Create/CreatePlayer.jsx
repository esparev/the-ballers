import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Message from '@components/Message';
import ButtonContainer from '@containers/ButtonContainer';
import updateThumbnail from '@functions/updateThumbnail';
import { authConfig } from '@constants';
import { envConfig } from '@config';
import '@styles/CreateEntity.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the create player page with all its functions
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const CreatePlayer = () => {
  // Sets the initial values for the form fields
  const [form, setValues] = useState({
    name: '',
    position: '',
    birthday: '',
    teamId: localStorage.getItem('selected team'),
  });

  useEffect(() => {
    document.title = 'New Player • The Ballers';
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

    // Opaque select placeholder until it has been modified
    var posEl = document.getElementById('positions');
    posEl.onchange = function () {
      if (posEl.value === '') {
        posEl.classList.add('empty');
      } else {
        posEl.classList.remove('empty');
      }
    };

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
    form.image = localStorage.getItem('uploaded image');

    ReactDOM.render(
      <Message message='Uploading image' messageStatus='upload' />,
      document.getElementById('message-container')
    );
    setTimeout(() => {
      ReactDOM.render(
        <Message message='Image uploaded' messageStatus='success' />,
        document.getElementById('message-container')
      );
    }, 1500);
  };

  /**
   * Sends a post request to the URL of the API provided
   * with the data entered by the user in a form along
   * with a bearer token included in the headers configuration
   * @param {string} url - API URL
   * @param {json} data - body data to post
   * @param {json} config - headers configuration
   */
  const addPlayer = async (url, data, config) => {
    await axios
      .post(url, data, config)
      .then((res) => {
        ReactDOM.render(
          <Message message='Player created successfully!' messageStatus='success' />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      })
      .catch((error) => {
        ReactDOM.render(
          <Message
            message={`Ups!, There was an error creating the player. 
            Verify that you have filled the necessary field`}
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      });
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    addPlayer(`${envConfig.apiUrl}/players`, form, authConfig);
  };

  return (
    <>
      <div id='message-container'></div>

      <main className='create-container'>
        <form className='form' onSubmit={handleSubmit}>
          <h1 className='form--title'>New player</h1>
          <div className='form__desktop'>
            <div className='form'>
              <input
                className='input'
                name='name'
                type='text'
                placeholder='Name *'
                required
                onChange={handleInput}
              />
              <select className='input empty' name='position' id='positions' onChange={handleInput}>
                <option defaultValue value=''>
                  Position
                </option>
                <option value='Pitcher'>Pitcher</option>
                <option value='Catcher'>Catcher</option>
                <option value='First Base'>First base</option>
                <option value='Second Base'>Second base</option>
                <option value='Third Base'>Third base</option>
                <option value='Short field'>Short field</option>
                <option value='Left gardener'>Jardinero izquierdo</option>
                <option value='Center fielder'>Center fielder</option>
                <option value='Right gardener'>Right gardener</option>
                <option value='Batter'>Batter</option>
              </select>
              <label className='form--label label label--bold' htmlFor='date'>
                Birthday
              </label>
              <input
                className='input empty'
                name='birthday'
                type='date'
                id='date'
                placeholder='Birthday'
                onChange={handleInput}
              />
            </div>
            <div className='form--field'>
              <label className='form--label label' htmlFor='file'>
                Profile picture
              </label>
              <div className='form__image form__image-square' id='drop-zone'>
                <input
                  className='form__image--input form__image-square--input'
                  type='file'
                  id='file'
                  accept='image/*'
                />
                <div className='form__image-labels form__image-square-labels'>
                  <span className='form__image--label form__image-square--label drop-zone--prompt'>
                    Drag an image
                  </span>
                  <span className='form__image--label-button form__image-square--label-button drop-zone--prompt'>
                    Or click to upload the image
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='form__footer'>
            <p className='form__footer--text'>Mandatory fields (*)</p>
            <ButtonContainer>
              <button type='submit' className='button primary-button'>
                Create
              </button>
            </ButtonContainer>
          </div>
        </form>
      </main>
    </>
  );
};

export default CreatePlayer;
