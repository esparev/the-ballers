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
  const { leagueId, teamId, coachId } = props.match.params;

  // Fetching the necessary data to showcase in the component
  const league = useGetLeague(envConfig.apiUrl, leagueId);
  const team = useGetTeam(envConfig.apiUrl, teamId);
  const coach = useGetCoach(envConfig.apiUrl, coachId);
  const coaches = useGetCoaches(envConfig.apiUrl, teamId);

  // Setting the coach's id to have data persistency only on local storage
  localStorage.setItem('selected coach', coach.id);

  useEffect(() => {
    document.title = 'BEISMICH • Entrenador';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className='player-coach__container'>
      <section className='cover'>
        <img className='cover--image' src={league.logo} alt='Portada' />
      </section>

      <section className='actor'>
        <div className='actor__container'>
          <img
            className='actor__container--image'
            src={coach.image}
            alt='Foto del entrenador'
          />
          <div className='actor__info'>
            <h1 className='actor__info--name'>{coach.name}</h1>
            <div className='actor__info-about'>
              <p>
                <strong>Nombre Equipo: </strong>
                {team.name}
              </p>
              <p>
                <strong>Fecha de Nacimiento: </strong>
                {coach.birthday}
              </p>
            </div>
          </div>
        </div>

        <section className='actors'>
          <div className='actors__container'>
            <h2 className='actors__container--title'>Más Entrenadores</h2>
            <div className='more-actors' onClick={loadComponent}>
              {coaches.map((coach) => (
                <MoreActors
                  coach={coach}
                  key={coach.id}
                  name={coach.name}
                  image={coach.image}
                  route={`/ligas/liga/${league.id}/equipo/${team.id}/entrenador/${coach.id}`}
                />
              ))}
            </div>
          </div>
        </section>

        {localStorage.getItem('id') ? (
          <ButtonContainer>
            <GrayButton
              name='Editar Entrenador'
              route={`/ligas/liga/${league.id}/equipo/${team.id}/entrenador/${coach.id}/editar-entrenador`}
            />
          </ButtonContainer>
        ) : null}
      </section>
    </main>
  );
};

export default Coach;
