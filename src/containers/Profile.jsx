import React, { useState, useEffect } from 'react';
import SecondaryButton from '@components/Buttons/SecondaryButton';
import ButtonContainer from '@containers/ButtonContainer';
import { getAdmin } from '@api/getAdmin';
import { envConfig } from '@config';
import '@styles/ActorContainer.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the profile page with all its functions
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const Profile = () => {
  // Assigns the admin's id from the local storage
  // that was defined after a successful login
  const slug = localStorage.getItem('slug');
  const [profileData, setProfileData] = useState({ slug: '', name: '', image: '', email: '' });

  // Fetching the data to showcase in the component
  const loadProfile = async () => {
    try {
      const response = await getAdmin(envConfig.apiUrl, slug);
      setProfileData({
        slug: response.slug,
        name: response.name,
        image: response.image,
        email: response.email,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Setting the admin's id to have data persistency only on local storage
  localStorage.setItem('selected admin', profileData.slug);

  useEffect(() => {
    document.title = 'Profile • The Ballers';
    window.scrollTo(0, 0);
    (async () => {
      await loadProfile();
    })();
  }, []);

  return (
    <main className='profile'>
      <section className='actor'>
        <div className='actor__container'>
          <img className='actor__container--image' src={profileData.image} alt='Profile picture' />
          <div className='actor__info'>
            <div className='actor__header'>
              <h1 className='actor__info--name'>{profileData.name}</h1>
              <ButtonContainer>
                <SecondaryButton name='Edit profile' route={`/edit-admin/${profileData.slug}`} />
              </ButtonContainer>
            </div>
            <div className='actor__info-about'>
              <p>
                <strong>Email: </strong>
                {profileData.email}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
