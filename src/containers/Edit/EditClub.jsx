import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Message from '@components/Message';
import DangerButton from '@components/Buttons/DangerButton';
import DeleteMessage from '@components/DeleteMessage';
import ButtonContainer from '@containers/ButtonContainer';
import { getClub } from '@api/getClub';
import toggleMessage from '@functions/toggleMessage';
import updateThumbnail from '@functions/updateThumbnail';
import { authConfig } from '@constants';
import { envConfig } from '@config';
import '@styles/CreateEntity.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the edit club page with all its functions
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const EditClub = (props) => {
  const { slug } = props.match.params;

  // Sets the initial values for the club fields
  const [clubForm, setClubValues] = useState({
    name: '',
    responsable: '',
    phone: '',
    ageStart: 0,
    ageEnd: 0,
    address: {
      streetName: '',
      streetNumber: '',
      zipCode: '',
      suburb: '',
      location: '',
    },
  });
  const [addressForm, setAddressValues] = useState({});

  // Fetching the data to showcase in the component
  const loadClub = async () => {
    try {
      const response = await getClub(envConfig.apiUrl, slug);
      setClubValues({
        name: response.name,
        responsable: response.responsable,
        phone: response.phone,
        ageStart: response.ageStart,
        ageEnd: response.ageEnd,
        address: {
          streetName: response.address.streetName,
          streetNumber: response.address.streetNumber,
          zipCode: response.address.zipCode,
          suburb: response.address.suburb,
          location: response.address.location,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    document.title = 'Edit Club • The Ballers';
    window.scrollTo(0, 0);

    (async () => {
      await loadClub();
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
    clubForm.logo = localStorage.getItem('uploaded image');

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
  const editClub = async (url, data, config) => {
    await axios
      .patch(url, data, config)
      .then((res) => {
        ReactDOM.render(
          <Message message='Club edited successfully!' messageStatus='success' />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      })
      .catch((error) => {
        ReactDOM.render(
          <Message
            message={`Ups!, There was an error editing the club. 
            Verify the information filled in the form`}
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
          <Message message="Club's address edited successfully!" messageStatus='success' />,
          document.getElementById('message-container')
        );
      })
      .catch((error) => {
        ReactDOM.render(
          <Message
            message={`Ups!, There was an error editing the club' address. 
            Verify the information filled in the form`}
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );
      });
  };

  /**
   * Sends a delete request to the URL of the API provided
   * to delete the selected club according to its id along
   * with a bearer token included in the headers configuration
   * @param {string} url - API URL
   * @param {json} config - headers configuration
   */
  const deleteClub = async (url, config) => {
    await axios
      .delete(url, config)
      .then((res) => {
        toggleMessage();
        ReactDOM.render(
          <Message message='Club deleted' messageStatus='success' />,
          document.getElementById('message-container')
        );

        localStorage.removeItem('uploaded image');
      })
      .catch((error) => {
        toggleMessage();
        ReactDOM.render(
          <Message
            message={`Ups!, There was an error deleting the club. 
            Try again later`}
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
          <Message message="Club's address deleted" messageStatus='success' />,
          document.getElementById('message-container')
        );
      })
      .catch((error) => {
        toggleMessage();
        ReactDOM.render(
          <Message
            message={`Ups!, There was an error deleting the club's address. 
            Try again later`}
            messageStatus='error'
          />,
          document.getElementById('message-container')
        );
      });
  };

  /**
   * Sets values after onChange event is triggered on the
   * indicated inputs
   */
  const handleClubInput = (event) => {
    setClubValues({
      ...clubForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddressInput = (event) => {
    setAddressValues({
      ...addressForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editClub(`${envConfig.apiUrl}/clubs/${slug}`, clubForm, authConfig);
    // editAddress(`${envConfig.apiUrl}/addresses/${slug}`, addressForm, authConfig);
  };

  const handleDelete = () => {
    deleteClub(`${envConfig.apiUrl}/clubs/${slug}`, authConfig);
    // deleteAddress(`${envConfig.apiUrl}/addresses/${slug}`, authConfig);
  };

  return (
    <>
      <div id='message-container'></div>

      <DeleteMessage entity='liga' onClick={handleDelete} />

      <main className='create-container'>
        <form className='form' onSubmit={handleSubmit}>
          <h1 className='form--title'>Edit club</h1>
          <div className='form__desktop'>
            <div className='form'>
              <input
                className='input'
                name='name'
                type='text'
                placeholder="Club's name"
                value={clubForm.name}
                onChange={handleClubInput}
              />
              <label className='label label--bold'>Responsible's data</label>
              <input
                className='input'
                name='responsable'
                type='text'
                placeholder='Name'
                value={clubForm.responsable}
                onChange={handleClubInput}
              />
              <input
                className='input'
                name='phone'
                type='num'
                maxLength='10'
                placeholder='Phone number'
                value={clubForm.phone}
                onChange={handleClubInput}
              />
              <label className='label label--bold'>Address</label>
              <input
                className='input'
                name='address.streetName'
                type='text'
                placeholder='Street name'
                value={clubForm.address.streetName}
                onChange={handleAddressInput}
              />
              <input
                className='input'
                name='address.streetNumber'
                type='text'
                placeholder='Street number'
                value={clubForm.address.streetNumber}
                onChange={handleAddressInput}
              />
              <input
                className='input'
                name='address.zipCode'
                type='text'
                maxLength='5'
                placeholder='Zip code'
                value={clubForm.address.zipCode}
                onChange={handleAddressInput}
              />
              <input
                className='input'
                name='address.suburb'
                type='text'
                placeholder='Suburb'
                value={clubForm.address.suburb}
                onChange={handleAddressInput}
              />
              <input
                className='input'
                name='address.location'
                type='text'
                placeholder='Location'
                value={clubForm.address.location}
                onChange={handleAddressInput}
              />
              <label className='label label--bold'>Age range</label>
              <div>
                <label className='label'>From</label>
                <input
                  className='input input-age'
                  name='ageStart'
                  type='tel'
                  maxLength='2'
                  placeholder='00'
                  value={clubForm.ageStart}
                  onChange={handleClubInput}
                />
                <label className='label'>to</label>
                <input
                  className='input input-age'
                  name='ageEnd'
                  type='tel'
                  maxLength='2'
                  placeholder='00'
                  value={clubForm.ageEnd}
                  onChange={handleClubInput}
                />
                <label className='label'>years</label>
              </div>
            </div>

            <div className='form--field'>
              <label className='form--label label' htmlFor='file'>
                Logo
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

export default EditClub;
