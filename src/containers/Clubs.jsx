import React, { useEffect } from 'react';
import Entity from '@components/Entity';
import PrimaryButton from '@components/Buttons/PrimaryButton';
import EntityContainer from '@containers/EntityContainer';
import ButtonContainer from '@containers/ButtonContainer';
import ServerError from '@containers/ServerError';
import useGetClubs from '@hooks/useGetClubs';
import { envConfig } from '@config';
import '@styles/Entities.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the leagues page with all its functions
 * stored inside for its full operation
 */
const Clubs = () => {
  // Fetching the data to showcase in the component
  const clubs = useGetClubs(envConfig.apiUrl);

  useEffect(() => {
    document.title = 'Clubs • The Ballers';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      {clubs.length > 0 ? (
        <section className='entities'>
          <div className='entities__header'>
            <h1 className='entities--title'>The Ballers's clubs</h1>
            {localStorage.getItem('slug') ? (
              <ButtonContainer>
                <PrimaryButton name='Create club' route='/new-club' />
              </ButtonContainer>
            ) : null}
          </div>

          <EntityContainer>
            {clubs.map((club) => (
              <Entity
                club={club}
                key={club.slug}
                name={club.name}
                logo={club.logo}
                route={`/club/${club.slug}`}
              />
            ))}
          </EntityContainer>
        </section>
      ) : (
        <ServerError />
      )}

      <section className='join-club'>
        <h1 className='join-club__message--title'>Are you interested in being part of a club?</h1>
        <p className='join-club__message--text'>
          If you are interested in being part of one of our clubs, download the following document
          to make your registration.
        </p>
        <a
          className='button primary-button'
          href='https://drive.google.com/uc?id=1ZsGEEBAAC5O1UOlOMhUv_fyErUKX2BVD&export=download'>
          Download Registration Application
        </a>
      </section>
    </main>
  );
};

export default Clubs;
