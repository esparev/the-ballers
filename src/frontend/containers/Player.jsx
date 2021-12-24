import React, { useEffect, useState } from 'react';
import MoreActors from '../components/MoreActors';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import useGetLeague from '../hooks/useGetLeague';
import useGetTeam from '../hooks/useGetTeam';
import useGetPlayer from '../hooks/useGetPlayer';
import useGetPlayers from '../hooks/useGetPlayers';
import { envConfig } from '../utils/config';
import '../assets/styles/components/ActorContainer.scss';

const Player = (props) => {
  const { leagueId, teamId, playerId } = props.match.params;

  const league = useGetLeague(envConfig.apiUrl, leagueId);
  const team = useGetTeam(envConfig.apiUrl, teamId);
  const player = useGetPlayer(envConfig.apiUrl, playerId);
  const players = useGetPlayers(envConfig.apiUrl, teamId);

  localStorage.setItem('selected player', player.id);

  const loadPlayer = () => {
    window.location.reload();
  };

  useEffect(() => {
    document.title = 'BEISMICH • Jugador';
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
            src={player.image}
            alt='Foto del jugador'
          />
          <div className='actor__info'>
            <h1 className='actor__info--name'>{player.name}</h1>
            <div className='actor__info-about'>
              <p>
                <strong>Nombre Equipo: </strong>
                {team.name}
              </p>
              <p>
                <strong>Posición de juego: </strong>
                {player.position}
              </p>
              <p>
                <strong>Fecha de Nacimiento: </strong>
                {player.birthday}
              </p>
            </div>
          </div>
        </div>

        <section className='actors'>
          <div className='actors__container'>
            <h2 className='actors__container--title'>Más Jugadores</h2>
            <div className='more-actors' onClick={loadPlayer}>
              {players.map((player) => (
                <MoreActors
                  player={player}
                  key={player.id}
                  name={player.name}
                  image={player.image}
                  route={`/ligas/liga/${league.id}/equipo/${team.id}/jugador/${player.id}`}
                />
              ))}
            </div>
          </div>
        </section>

        {localStorage.getItem('id') ? (
          <ButtonContainer>
            <GrayButton
              name='Editar Jugador'
              route={`/ligas/liga/${league.id}/equipo/${team.id}/jugador/${player.id}/editar-jugador`}
            />
          </ButtonContainer>
        ) : null}
      </section>
    </main>
  );
};

export default Player;
