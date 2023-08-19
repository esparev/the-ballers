import React, { useState, useEffect } from 'react';
import MoreActors from '@components/MoreActors';
import SecondaryButton from '@components/Buttons/SecondaryButton';
import ButtonContainer from '@containers/ButtonContainer';
import ServerError from '@containers/ServerError';
import { getPlayer } from '../api/getPlayer';
import useGetClub from '@hooks/useGetClub';
import useGetPlayers from '@hooks/useGetPlayers';
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
  // Assigns the player's slug from the URL to the playerSlug props
  // as well for its respective club and team slug to identify
  // which team the player belongs to and which club his team belongs to
  const { clubSlug, teamSlug, playerSlug } = props.match.params;
  const [playerData, setPlayerData] = useState({
    slug: '',
    name: '',
    image: '',
    position: '',
    birthday: '',
    team: {
      name: '',
    },
  });

  // Fetching the data to showcase in the component
  const loadPlayer = async () => {
    try {
      const response = await getPlayer(envConfig.apiUrl, playerSlug);
      setPlayerData({
        slug: response.slug,
        name: response.name,
        image: response.image,
        position: response.position,
        birthday: response.birthday,
        team: {
          name: response.team.name,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Fetching the necessary data to showcase in the component
  const club = useGetClub(envConfig.apiUrl, clubSlug);
  const players = useGetPlayers(envConfig.apiUrl, teamSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      await loadPlayer();
    })();
  }, [playerSlug]);

  useEffect(() => {
    document.title = `${playerData.name} • The Ballers`;
  }, [playerData]);

  return (
    <>
      {players.length > 0 ? (
        <main className='player-coach__container'>
          <section className='cover'>
            <img className='cover--image' src={club.logo} alt='Cover' />
          </section>

          <section className='actor'>
            <div className='actor__container'>
              <img
                className='actor__container--image'
                src={playerData.image}
                alt={`${playerData.name} profile`}
              />
              <div className='actor__info'>
                <div className='actor__header'>
                  <h1 className='actor__info--name'>{playerData.name}</h1>
                  {localStorage.getItem('slug') ? (
                    <ButtonContainer>
                      <SecondaryButton
                        name='Edit player'
                        route={`/edit-player/${playerData.slug}`}
                      />
                    </ButtonContainer>
                  ) : null}
                </div>
                <div className='actor__info-about'>
                  <p>
                    <strong>Team: </strong>
                    {playerData.team.name}
                  </p>
                  <p>
                    <strong>Position: </strong>
                    {playerData.position}
                  </p>
                  <p>
                    <strong>Birthday: </strong>
                    {playerData.birthday}
                  </p>
                </div>
              </div>
            </div>

            <section className='actors'>
              <div className='actors__container'>
                <h2 className='actors__container--title'>More players</h2>
                <div className='more-actors'>
                  {players.map((player) => (
                    <MoreActors
                      player={player}
                      key={player.slug}
                      name={player.name}
                      image={player.image}
                      route={`/club/${club.slug}/team/${playerData.team.slug}/player/${player.slug}`}
                    />
                  ))}
                </div>
              </div>
            </section>
          </section>
        </main>
      ) : (
        <ServerError />
      )}
    </>
  );
};

export default Player;
