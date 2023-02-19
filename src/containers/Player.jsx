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
  const { clubSlug, teamSlug, playerSlug } = props.match.params;

  // Fetching the necessary data to showcase in the component
  const league = useGetClub(envConfig.apiUrl, clubSlug);
  const team = useGetTeam(envConfig.apiUrl, teamSlug);
  const player = useGetPlayer(envConfig.apiUrl, playerSlug);
  const players = useGetPlayers(envConfig.apiUrl, teamSlug);

  // Setting the coach's id to have data persistency only on local storage
  localStorage.setItem('selected player', player.id);

  useEffect(() => {
    document.title = 'The Ballers • Players';
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
            src={player.image}
            alt={`${player.name} profile`}
          />
          <div className='actor__info'>
            <div className='actor__header'>
              <h1 className='actor__info--name'>{player.name}</h1>
              {localStorage.getItem('id') ? (
                <ButtonContainer>
                  <SecondaryButton name='Edit player' route={`/edit-player/${player.slug}`} />
                </ButtonContainer>
              ) : null}
            </div>
            <div className='actor__info-about'>
              <p>
                <strong>Team: </strong>
                {team.name}
              </p>
              <p>
                <strong>Position: </strong>
                {player.position}
              </p>
              <p>
                <strong>Birthday: </strong>
                {player.birthday}
              </p>
            </div>
          </div>
        </div>

        <section className='actors'>
          <div className='actors__container'>
            <h2 className='actors__container--title'>More players</h2>
            <div className='more-actors' onClick={loadComponent}>
              {players.map((player) => (
                <MoreActors
                  player={player}
                  key={player.slug}
                  name={player.name}
                  image={player.image}
                  route={`/club/${league.slug}/${team.slug}/${player.slug}`}
                />
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Player;
