import React, { useEffect } from 'react';
import MoreActors from '../components/MoreActors';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import useGetLeague from '../hooks/useGetLeague';
import useGetTeam from '../hooks/useGetTeam';
import useGetCoach from '../hooks/useGetCoach';
import useGetCoaches from '../hooks/useGetCoaches';
import loadComponent from '../utils/functions/loadComponent';
import { envConfig } from '../utils/config';
import '../assets/styles/components/ActorContainer.scss';
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
  const { ligaSlug, equipoSlug, entrenadorSlug } = props.match.params;

  // Fetching the necessary data to showcase in the component
  const league = useGetLeague(envConfig.apiUrl, ligaSlug);
  const team = useGetTeam(envConfig.apiUrl, equipoSlug);
  const coach = useGetCoach(envConfig.apiUrl, entrenadorSlug);
  const coaches = useGetCoaches(envConfig.apiUrl, equipoSlug);

  // Setting the coach's id to have data persistency only on local storage
  localStorage.setItem('selected coach', coach.id);

  useEffect(() => {
    document.title = 'BEISMICH • Coach';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className='player-coach__container'>
      <section className='cover'>
        <img className='cover--image' src={league.logo} alt='Cover' />
      </section>

      <section className='actor'>
        <div className='actor__container'>
          <img
            className='actor__container--image'
            src={coach.image}
            alt='Coach photo'
          />
          <div className='actor__info'>
            <h1 className='actor__info--name'>{coach.name}</h1>
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
                  key={coach.id}
                  name={coach.name}
                  image={coach.image}
                  route={`/ligas/${league.id}/${team.id}/${coach.id}`}
                />
              ))}
            </div>
          </div>
        </section>

        {localStorage.getItem('id') ? (
          <ButtonContainer>
            <GrayButton
              name='Edit Coach'
              route={`/ligas/${league.id}/${team.id}/${coach.id}/editar-entrenador`}
            />
          </ButtonContainer>
        ) : null}
      </section>
    </main>
  );
};

export default Coach;
