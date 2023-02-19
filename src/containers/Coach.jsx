import React, { useEffect } from 'react';
import MoreActors from '@components/MoreActors';
import SecondaryButton from '@components/SecondaryButton';
import ButtonContainer from '@containers/ButtonContainer';
import useGetClub from '@hooks/useGetClub';
import useGetTeam from '@hooks/useGetTeam';
import useGetCoach from '@hooks/useGetCoach';
import useGetCoaches from '@hooks/useGetCoaches';
import loadComponent from '@functions/loadComponent';
import { envConfig } from '@config';
import '@styles/ActorContainer.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the coach page with all its functions
 * stored inside for its full operation
 * @param {*} props
 * @returns JSX code to render to the DOM tree
 */
const Coach = (props) => {
  // Assigns the coach's id from the URL to the coachId props
  // as well for its respective league and team id to identify
  // which team the coach belongs to and which league his team belongs to
  const { clubSlug, teamSlug, coachSlug } = props.match.params;

  // Fetching the necessary data to showcase in the component
  const league = useGetClub(envConfig.apiUrl, clubSlug);
  const team = useGetTeam(envConfig.apiUrl, teamSlug);
  const coach = useGetCoach(envConfig.apiUrl, coachSlug);
  const coaches = useGetCoaches(envConfig.apiUrl, teamSlug);

  // Setting the coach's id to have data persistency only on local storage
  localStorage.setItem('selected coach', coach.id);

  useEffect(() => {
    document.title = 'The Ballers • Coach';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className='player-coach__container'>
      <section className='cover'>
        <img className='cover--image' src={league.logo} alt='Cover' />
      </section>

      <section className='actor'>
        <div className='actor__container'>
          <img className='actor__container--image' src={coach.image} alt='Coach photo' />
          <div className='actor__info'>
            <div className='actor__header'>
              <h1 className='actor__info--name'>{coach.name}</h1>
              {localStorage.getItem('id') ? (
                <ButtonContainer>
                  <SecondaryButton name='Edit coach' route={`/edit-coach/${coach.id}`} />
                </ButtonContainer>
              ) : null}
            </div>
            <div className='actor__info-about'>
              <p>
                <strong>Team: </strong>
                {team.name}
              </p>
              <p>
                <strong>Birth: </strong>
                {coach.birthday}
              </p>
            </div>
          </div>
        </div>

        <section className='actors'>
          <div className='actors__container'>
            <h2 className='actors__container--title'>More coaches</h2>
            <div className='more-actors' onClick={loadComponent}>
              {coaches.map((coach) => (
                <MoreActors
                  coach={coach}
                  key={coach.slug}
                  name={coach.name}
                  image={coach.image}
                  route={`/club/${league.slug}/${team.slug}/${coach.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Coach;
