import React, { useEffect, useState } from 'react';
import MoreActors from '../components/MoreActors';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import useGetLeague from '../hooks/useGetLeague';
import useGetTeam from '../hooks/useGetTeam';
import useGetCoach from '../hooks/useGetCoach';
import useGetCoaches from '../hooks/useGetCoaches';
import { envConfig } from '../utils/config';
import '../assets/styles/components/ActorContainer.scss';

const Coach = (props) => {
  const { leagueId, teamId, coachId } = props.match.params;

  const league = useGetLeague(envConfig.apiUrl, leagueId);
  const team = useGetTeam(envConfig.apiUrl, teamId);
  const coach = useGetCoach(envConfig.apiUrl, coachId);
  const coaches = useGetCoaches(envConfig.apiUrl, teamId);
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
            <div className='more-actors'>
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
