import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Message from '@components/Message';
import DangerButton from '@components/DangerButton';
import DeleteMessage from '@components/DeleteMessage';
import ButtonContainer from '@containers/ButtonContainer';
import { getAdmin } from '../api/getAdmin';
import toggleMessage from '@functions/toggleMessage';
import updateThumbnail from '@functions/updateThumbnail';
import { authConfig } from '@constants';
import { envConfig } from '@config';
import '@styles/CreateEntity.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the edit admin page with all its functions
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const EditAdmin = (props) => {
  const { slug } = props.match.params;

  // Sets the initial values for the form fields
  const [form, setValues] = useState({ name: '', email: '' });

  // Fetching the data to showcase in the component
  const loadAdmin = async () => {
    try {
      const response = await getAdmin(envConfig.apiUrl, slug);
      setValues({ name: response.name, email: response.email });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = 'Edit Admin • The Ballers';
    window.scrollTo(0, 0);

    (async () => {
      await loadAdmin();
    })();

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
   * Sends a patch request to the URL of the API provided
   * with the data entered by the user in a form along
   * with a bearer token included in the headers configuration
   * @param {string} url - API URL
   * @param {json} data - body data to post
   * @param {json} config - headers configuration
   */
  const editAdmin = async (url, data, config) => {
    await axios
      .patch(url, data, config)
      .then((res) => {
        ReactDOM.render(
          <Message message='Admin edited successfully!' messageStatus='success' />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      })
      .catch((error) => {
        ReactDOM.render(
          <Message
            message={`Ups!, There was an error editing the admin. 
            Verify the information filled in the form`}
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
  const deleteAdmin = async (url, config) => {
    await axios
      .delete(url, config)
      .then((res) => {
        toggleMessage();
        ReactDOM.render(
          <Message message='Admin deleted' messageStatus='success' />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      })
      .catch((error) => {
        toggleMessage();
        ReactDOM.render(
          <Message
            message={`Ups!, There was an error deleting the admin. 
            Try again later`}
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
    editAdmin(
      `${envConfig.apiUrl}/admins/${localStorage.getItem('selected admin')}`,
      form,
      authConfig
    );
  };

  const handleDelete = () => {
    deleteAdmin(`${envConfig.apiUrl}/admins/${localStorage.getItem('selected admin')}`, authConfig);
  };

  return (
    <>
      <div id='message-container'></div>

      <DeleteMessage entity='administrador' onClick={handleDelete} />

      <main className='create-container'>
        <form className='form' onSubmit={handleSubmit}>
          <h1 className='form--title'>Edit admin</h1>
          <div className='form__desktop'>
            <div className='form'>
              <input
                className='input'
                name='name'
                type='text'
                placeholder='Name'
                autoComplete='off'
                value={form.name}
                onChange={handleInput}
              />
              <input
                className='input'
                name='email'
                type='email'
                placeholder='Email'
                autoComplete='off'
                value={form.email}
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

          <ButtonContainer>
            <button type='submit' className='button primary-button'>
              Save changes
            </button>
            <DangerButton name='Delete' onClick={toggleMessage} />
          </ButtonContainer>
        </form>
      </main>
    </>
  );
};

export default EditAdmin;
