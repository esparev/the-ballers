import React, { useState, useEffect } from 'react';
import Actor from '@components/Actor';
import PrimaryButton from '@components/PrimaryButton';
import SecondaryButton from '@components/SecondaryButton';
import ButtonContainer from '@containers/ButtonContainer';
import { getTeam } from '../api/getTeam';
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
  const { teamSlug } = props.match.params;
  const [teamData, setTeamData] = useState({
    slug: '',
    name: '',
    logo: '',
    manager: '',
    club: { slug: '', name: '' },
  });

  const loadTeam = async () => {
    try {
      const response = await getTeam(envConfig.apiUrl, teamSlug);
      setTeamData({
        slug: response.slug,
        name: response.name,
        logo: response.logo,
        manager: response.manager,
        club: { slug: response.club.slug, name: response.club.name },
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Fetching the necessary data to showcase in the component
  const players = useGetPlayers(envConfig.apiUrl, teamSlug);
  const coaches = useGetCoaches(envConfig.apiUrl, teamSlug);

  // Setting the admin's id to have data persistency only on local storage
  localStorage.setItem('selected team', teamData.id);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      await loadTeam();
    })();

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
  }, [teamSlug]);

  useEffect(() => {
    document.title = `${teamData.name} • The Ballers`;
  }, [teamData]);

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
            <img className='team--image' src={teamData.logo} alt={`${teamData.logo}'s logo`} />
            <div className='team__header'>
              <div className='team__title'>
                <h1 className='team--h1'>{teamData.name}</h1>
                {localStorage.getItem('id') ? (
                  <ButtonContainer>
                    <a className='button primary-button' onClick={toggleMessage}>
                      Create player/coach
                    </a>
                    <SecondaryButton name='Edit team' route={`/edit-team/${teamData.slug}`} />
                  </ButtonContainer>
                ) : null}
              </div>
              <div className='team__info'>
                {teamData.manager ? (
                  <p>
                    <strong>Manager: </strong>
                    {teamData.manager}
                  </p>
                ) : null}
                <p>
                  <strong>Club: </strong>
                  {teamData.club.name}
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
                    route={`/club/${teamData.club.slug}/team/${teamData.slug}/player/${player.slug}`}
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
                    route={`/club/${teamData.club.slug}/team/${teamData.slug}/coach/${coach.slug}`}
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
