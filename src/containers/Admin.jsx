import React, { useState, useEffect } from 'react';
import MoreActors from '@components/MoreActors';
import SecondaryButton from '@components/SecondaryButton';
import ButtonContainer from '@containers/ButtonContainer';
import ServerError from '@containers/ServerError';
import { getAdmin } from '../api/getAdmin';
import useGetAdmins from '@hooks/useGetAdmins';
import { envConfig } from '@config';
import '@styles/ActorContainer.scss';
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
  const [adminData, setAdminData] = useState({
    slug: '',
    name: '',
    email: '',
    image: '',
  });

  const loadAdmin = async () => {
    try {
      const response = await getAdmin(envConfig.apiUrl, slug);
      setAdminData({
        slug: response.slug,
        name: response.name,
        email: response.email,
        image: response.image,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Fetching the necessary data to showcase in the component
  const admins = useGetAdmins(envConfig.apiUrl);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      await loadAdmin();
    })();
  }, [slug]);

  useEffect(() => {
    document.title = `${adminData.name} • The Ballers`;
  }, [adminData]);

  return (
    <>
      {admins.length > 0 ? (
        <main>
          <section className='actor'>
            <div className='actor__container'>
              <img
                className='actor__container--image'
                src={adminData.image}
                alt='Profile picture'
              />
              <div className='actor__info'>
                <h1 className='actor__info--name'>{adminData.name}</h1>
                <div className='actor__info-about'>
                  <p>
                    <strong>Email: </strong>
                    {adminData.email}
                  </p>
                </div>
              </div>
            </div>

            <section className='actors'>
              <div className='actors__container'>
                <h2 className='actors__container--title'>More Admins</h2>
                <div className='more-actors'>
                  {admins.map((admin) => (
                    <MoreActors
                      admin={admin}
                      key={admin.slug}
                      name={admin.name}
                      image={admin.image}
                      route={`/admin/${admin.slug}`}
                    />
                  ))}
                </div>
              </div>
            </section>

            <ButtonContainer>
              {localStorage.getItem('role') === 'hero' ? (
                <SecondaryButton name='Edit Admin' route={`/edit-admin/${adminData.slug}`} />
              ) : null}
            </ButtonContainer>
          </section>
        </main>
      ) : (
        <ServerError />
      )}
    </>
  );
};

export default Admin;
