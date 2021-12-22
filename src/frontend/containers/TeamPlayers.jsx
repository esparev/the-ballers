import React, { useEffect } from 'react';
import Actor from '../components/Actor';
import ButtonContainer from './ButtonContainer';
import YellowButton from '../components/YellowButton';
import GrayButton from '../components/GrayButton';
import toggleMessage from '../functions/toggleMessage';
import useGetTeam from '../hooks/useGetTeam';
import useGetLeagues from '../hooks/useGetLeagues';
import useGetPlayers from '../hooks/useGetPlayers';
import useGetCoaches from '../hooks/useGetCoaches';
import '../assets/styles/components/TeamPlayers.scss';
import '../assets/styles/components/FeedbackMessage.scss';

const API = 'https://beismich.herokuapp.com/api/v1';

const TeamPlayers = (props) => {
  const { leagueId, teamId } = props.match.params;

  const team = useGetTeam(`${API}/equipos/${teamId}`);
  const league = useGetLeagues(`${API}/ligas/${leagueId}`);
  const players = useGetPlayers(API, teamId);
  const coaches = useGetCoaches(API, teamId);
  localStorage.setItem('selected team', team.id);

  useEffect(() => {
    document.title = 'BEISMICH • Equipo';
    window.scrollTo(0, 0);

    /**
     * Hides the message
     */
    const hideMessage = () => {
      var message = document.getElementById('feedback-message');
      if (message.style.display === '') {
        message.style.display = 'none';
      }
    };
    hideMessage();
  }, []);

  return (
    <>
      <div className='feedback-message' id='feedback-message'>
        <div className='feedback-message__container'>
          <h1 className='feedback-message__container--title'>
            ¿Desea agregar a un Jugador o un Entrenador?
          </h1>
          <p className='feedback-message__container--text'>
            Elija si decide agregar a un jugador o a un entrenador
          </p>
          <div className='buttons__container'>
            <YellowButton
              name='Jugador'
              route={`/ligas/liga/${league.id}/equipo/${team.id}/nuevo-jugador`}
            />
            <YellowButton
              name='Entrenador'
              route={`/ligas/liga/${league.id}/equipo/${team.id}/nuevo-entrenador`}
            />
            <a className='button gray-button' onClick={toggleMessage}>
              Cancelar
            </a>
          </div>
        </div>
      </div>

      <main className='team-players'>
        <section className='team'>
          <div className='team__main'>
            <img
              className='team--image'
              src={team.logo}
              alt='Logo del equipo'
            />
            <h1 className='team--title'>{team.name}</h1>
          </div>
          <div className='team__info'>
            <div>
              {team.manager ? (
                <p>
                  <strong>Manager: </strong>
                  {team.manager}
                </p>
              ) : null}
              <p>
                <strong>Liga: </strong>
                {league.name}
              </p>
            </div>
          </div>
        </section>

        <div className='players-coach'>
          <section className='actors'>
            <h2 className='actors--title'>Jugadores</h2>
            {players.length > 0 && (
              <div className='actors__container'>
                {players.map((player) => (
                  <Actor
                    player={player}
                    key={player.id}
                    name={player.name}
                    image={player.image}
                    position={player.position}
                    route={`/ligas/liga/${league.id}/equipo/${team.id}/jugador/${player.id}`}
                  />
                ))}
              </div>
            )}
            {players.length === 0 && (
              <h2 className='no-teams'>Este equipo aún no tiene jugadores</h2>
            )}
          </section>

          <section className='actors'>
            <h2 className='actors--title'>Entrenador</h2>
            {coaches.length > 0 && (
              <div className='actors__container'>
                {coaches.map((coach) => (
                  <Actor
                    coach={coach}
                    key={coach.id}
                    name={coach.name}
                    image={coach.image}
                    route={`/ligas/liga/${league.id}/equipo/${team.id}/entrenador/${coach.id}`}
                  />
                ))}
              </div>
            )}
            {coaches.length === 0 && (
              <h2 className='no-teams'>
                Este equipo aún no tiene entrenadores
              </h2>
            )}
          </section>
        </div>

        {localStorage.getItem('id') ? (
          <ButtonContainer>
            <a className='button yellow-button' onClick={toggleMessage}>
              Nuevo Jugador/Entrenador
            </a>
            <GrayButton
              name='Editar Equipo'
              route={`/ligas/liga/${league.id}/equipo/${team.id}/editar-equipo`}
            />
          </ButtonContainer>
        ) : null}
      </main>
    </>
  );
};

export default TeamPlayers;
