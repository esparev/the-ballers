import React, { useEffect } from 'react';
import Entity from '@components/Entity';
import PrimaryButton from '@components/PrimaryButton';
import EntityContainer from '@containers/EntityContainer';
import ButtonContainer from '@containers/ButtonContainer';
import useGetClubs from '@hooks/useGetClubs';
import { envConfig } from '@config';
import '@styles/Entities.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the leagues page with all its functions
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const Leagues = () => {
  // Fetching the necessary data to showcase in the component
  const clubs = useGetClubs(envConfig.apiUrl);

  useEffect(() => {
    document.title = 'The Ballers • Clubs';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <section className='entities'>
        <div className='entities__header'>
          <h1 className='entities--title'>The Ballers's clubs</h1>
          {localStorage.getItem('id') ? (
            <ButtonContainer>
              <PrimaryButton name='Create club' route='/ligas/nueva-liga' />
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
              route={`/ligas/${club.slug}`}
            />
          ))}
        </EntityContainer>
      </section>

      <section className='join-club'>
        <h1 className='join-club__message--title'>Are you interested in being part of a club?</h1>
        <p className='join-club__message--text'>
          If you are interested in being part of one of our leagues, download the following document
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

export default Leagues;
