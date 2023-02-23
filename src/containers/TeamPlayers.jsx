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
  const { clubSlug, teamSlug } = props.match.params;

  // Fetching the necessary data to showcase in the component
  const league = useGetClub(envConfig.apiUrl, clubSlug);
  const team = useGetTeam(envConfig.apiUrl, teamSlug);
  const players = useGetPlayers(envConfig.apiUrl, teamSlug);
  const coaches = useGetCoaches(envConfig.apiUrl, teamSlug);

  // Setting the admin's id to have data persistency only on local storage
  localStorage.setItem('selected team', team.id);

  useEffect(() => {
    document.title = 'Team • The Ballers';
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
            Do you want to add a Player or a Coach?
          </h1>
          <p className='feedback-message__container--text'>
            Choose whether you decide to add a player or a coach
          </p>
          <div className='buttons__container'>
            <PrimaryButton name='Player' route={`/new-player`} />
            <PrimaryButton name='Coach' route={`/new-coach`} />
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
                    <SecondaryButton name='Edit team' route={`/edit-team/${team.slug}`} />
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
                    route={`/club/${league.slug}/team/${team.slug}/player/${player.slug}`}
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
                    route={`/club/${league.slug}/team/${team.slug}/coach/${coach.slug}`}
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
