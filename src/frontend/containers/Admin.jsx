import React, { useEffect } from 'react';
import MoreActors from '../components/MoreActors';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import useGetAdmin from '../hooks/useGetAdmin';
import useGetAdmins from '../hooks/useGetAdmins';
import loadComponent from '../utils/functions/loadComponent';
import { envConfig } from '../utils/config';
import '../assets/styles/components/ActorContainer.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the admin page with all its functions
 * stored inside for its full operation
 * @param {*} props
 * @returns JSX code to render to the DOM tree
 */
const Admin = (props) => {
  // Assigns the admin's id from the URL to the id props
  const { slug } = props.match.params;

  // Fetching the necessary data to showcase in the component
  const admin = useGetAdmin(envConfig.apiUrl, slug);
  const admins = useGetAdmins(envConfig.apiUrl);

  // Setting the admin's id to have data persistency only on local storage
  localStorage.setItem('selected admin', admin.id);

  useEffect(() => {
    document.title = 'BEISMICH • Admin';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <section className='actor'>
        <div className='actor__container'>
          <img
            className='actor__container--image'
            src={admin.image}
            alt='Profile picture'
          />
          <div className='actor__info'>
            <h1 className='actor__info--name'>{admin.name}</h1>
            <div className='actor__info-about'>
              <p>
                <strong>Email: </strong>
                {admin.email}
              </p>
            </div>
          </div>
        </div>

        <section className='actors'>
          <div className='actors__container'>
            <h2 className='actors__container--title'>More Admins</h2>
            <div className='more-actors' onClick={loadComponent}>
              {admins.map((admin) => (
                <MoreActors
                  admin={admin}
                  key={admin.id}
                  name={admin.name}
                  image={admin.image}
                  route={`/admins/${admin.id}`}
                />
              ))}
            </div>
          </div>
        </section>

        <ButtonContainer>
          {localStorage.getItem('role') === 'hero' ? (
            <GrayButton
              name='Edit Admin'
              route={`/admins/${admin.id}/edit-admin`}
            />
          ) : null}
        </ButtonContainer>
      </section>
    </main>
  );
};

export default Admin;
