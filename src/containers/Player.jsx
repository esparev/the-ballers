import React, { useEffect } from 'react';
import MoreActors from '@components/MoreActors';
import SecondaryButton from '@components/SecondaryButton';
import ButtonContainer from '@containers/ButtonContainer';
import useGetClub from '@hooks/useGetClub';
import useGetTeam from '@hooks/useGetTeam';
import useGetPlayer from '@hooks/useGetPlayer';
import useGetPlayers from '@hooks/useGetPlayers';
import loadComponent from '@functions/loadComponent';
import { envConfig } from '@config';
import '@styles/ActorContainer.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the player page with all its functions
 * stored inside for its full operation
 * @param {*} props
 * @returns JSX code to render to the DOM tree
 */
const Player = (props) => {
  // Assigns the player's id from the URL to the playerId props
  // as well for its respective league and team id to identify
  // which team the player belongs to and which league his team belongs to
  const { ligaSlug, equipoSlug, jugadorSlug } = props.match.params;

  // Fetching the necessary data to showcase in the component
  const league = useGetClub(envConfig.apiUrl, ligaSlug);
  const team = useGetTeam(envConfig.apiUrl, equipoSlug);
  const player = useGetPlayer(envConfig.apiUrl, jugadorSlug);
  const players = useGetPlayers(envConfig.apiUrl, equipoSlug);

  // Setting the coach's id to have data persistency only on local storage
  localStorage.setItem('selected player', player.id);

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
                <strong>Equipo: </strong>
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
            <div className='more-actors' onClick={loadComponent}>
              {players.map((player) => (
                <MoreActors
                  player={player}
                  key={player.id}
                  name={player.name}
                  image={player.image}
                  route={`/ligas/${league.id}/${team.id}/${player.id}`}
                />
              ))}
            </div>
          </div>
        </section>

        {localStorage.getItem('id') ? (
          <ButtonContainer>
            <SecondaryButton
              name='Editar Jugador'
              route={`/ligas/${league.id}/${team.id}/${player.id}/editar-jugador`}
            />
          </ButtonContainer>
        ) : null}
      </section>
    </main>
  );
};

export default Player;
