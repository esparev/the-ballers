import React, { useEffect } from 'react';
import Actor from '@components/Actor';
import PrimaryButton from '@components/PrimaryButton';
import SecondaryButton from '@components/SecondaryButton';
import ButtonContainer from '@containers/ButtonContainer';
import useGetClub from '@hooks/useGetClub';
import useGetTeam from '@hooks/useGetTeam';
import useGetPlayers from '@hooks/useGetPlayers';
import useGetCoaches from '@hooks/useGetCoaches';
import toggleMessage from '@functions/toggleMessage';
import { envConfig } from '@config';
import '@styles/TeamPlayers.scss';
import '@styles/FeedbackMessage.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the team players page with all its functions
 * stored inside for its full operation
 * @param {*} props
 * @returns JSX code to render to the DOM tree
 */
const TeamPlayers = (props) => {
  // Assigns the team's id from the URL to the teamId props
  // as well for its respective league to identify
  // which league the team belongs to
  const { ligaSlug, equipoSlug } = props.match.params;

  // Fetching the necessary data to showcase in the component
  const league = useGetClub(envConfig.apiUrl, ligaSlug);
  const team = useGetTeam(envConfig.apiUrl, equipoSlug);
  const players = useGetPlayers(envConfig.apiUrl, equipoSlug);
  const coaches = useGetCoaches(envConfig.apiUrl, equipoSlug);

  // Setting the admin's id to have data persistency only on local storage
  localStorage.setItem('selected team', team.id);

  useEffect(() => {
    document.title = 'The Ballers • Team';
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
            <PrimaryButton
              name='Jugador'
              route={`/ligas/${league.slug}/${team.slug}/nuevo-jugador`}
            />
            <PrimaryButton
              name='Entrenador'
              route={`/ligas/${league.slug}/${team.slug}/nuevo-entrenador`}
            />
            <a className='button secondary-button' onClick={toggleMessage}>
              Cancelar
            </a>
          </div>
        </div>
      </div>

      <main className='team-players'>
        <section className='team'>
          <div className='team__main'>
            <img className='team--image' src={team.logo} alt={`${team.logo}'s logo`} />
            <div className='team__header'>
              <div className='team__title'>
                <h1 className='team--h1'>{team.name}</h1>
                {localStorage.getItem('id') ? (
                  <ButtonContainer>
                    <a className='button primary-button' onClick={toggleMessage}>
                      Create player/coach
                    </a>
                    <SecondaryButton
                      name='Edit team'
                      route={`/ligas/${league.slug}/${team.slug}/editar-equipo`}
                    />
                  </ButtonContainer>
                ) : null}
              </div>
              <div className='team__info'>
                {team.manager ? (
                  <p>
                    <strong>Manager: </strong>
                    {team.manager}
                  </p>
                ) : null}
                <p>
                  <strong>Club: </strong>
                  {league.name}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className='players-coach'>
          <section className='actors'>
            <h2 className='actors--title'>Players</h2>
            {players.length > 0 ? (
              <div className='actors__container'>
                {players.map((player) => (
                  <Actor
                    player={player}
                    key={player.slug}
                    name={player.name}
                    image={player.image}
                    position={player.position}
                    route={`/ligas/${league.slug}/${team.slug}/${player.slug}`}
                  />
                ))}
              </div>
            ) : (
              <h2 className='no-teams'>This team doesn't have players yet</h2>
            )}
          </section>

          <section className='actors'>
            <h2 className='actors--title'>Coaches</h2>
            {coaches.length > 0 ? (
              <div className='actors__container'>
                {coaches.map((coach) => (
                  <Actor
                    coach={coach}
                    key={coach.slug}
                    name={coach.name}
                    image={coach.image}
                    route={`/ligas/${league.slug}/${team.slug}/${coach.slug}`}
                  />
                ))}
              </div>
            ) : (
              <h2 className='no-teams'>This team doesn't have coaches yet</h2>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default TeamPlayers;
