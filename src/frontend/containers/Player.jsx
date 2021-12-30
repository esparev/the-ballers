import React, { useEffect } from 'react';
import MoreActors from '../components/MoreActors';
import ButtonContainer from './ButtonContainer';
import useGetLeague from '../hooks/useGetLeague';
import useGetTeam from '../hooks/useGetTeam';
import useGetPlayer from '../hooks/useGetPlayer';
import useGetPlayers from '../hooks/useGetPlayers';
import loadComponent from '../utils/functions/loadComponent';
import loadPage from '../utils/functions/loadPage';
import { envConfig } from '../utils/config';
import '../assets/styles/components/ActorContainer.scss';
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
  const { leagueId, teamId, playerId } = props.match.params;

  // Fetching the necessary data to showcase in the component
  const league = useGetLeague(envConfig.apiUrl, leagueId);
  const team = useGetTeam(envConfig.apiUrl, teamId);
  const player = useGetPlayer(envConfig.apiUrl, playerId);
  const players = useGetPlayers(envConfig.apiUrl, teamId);

  // Setting the coach's id to have data persistency only on local storage
  localStorage.setItem('selected player', player.id);

  const handleLoad = () => {
    loadPage(
      `/#/ligas/liga/${league.id}/equipo/${team.id}/jugador/${player.id}/editar-jugador`
    );
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
            <div className='more-actors' onClick={loadComponent}>
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
            <button className='button gray-button' onClick={handleLoad}>
              Editar Jugador
            </button>
          </ButtonContainer>
        ) : null}
      </section>
    </main>
  );
};

export default Player;
