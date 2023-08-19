import React, { useState, useEffect } from 'react';
import MoreActors from '@components/MoreActors';
import SecondaryButton from '@components/Buttons/SecondaryButton';
import ButtonContainer from '@containers/ButtonContainer';
import ServerError from '@containers/ServerError';
import { getCoach } from '../api/getCoach';
import useGetClub from '@hooks/useGetClub';
import useGetCoaches from '@hooks/useGetCoaches';
import { envConfig } from '@config';
import '@styles/ActorContainer.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the coach page with all its functions
 * stored inside for its full operation
 * @param {*} props
 * @returns JSX code to render to the DOM tree
 */
const Coach = (props) => {
  // Assigns the coach's slug from the URL to the coachSlug props
  // as well for its respective club and team slug to identify
  // which team the coach belongs to and which club his team belongs to
  const { clubSlug, teamSlug, coachSlug } = props.match.params;
  const [coachData, setCoachData] = useState({
    slug: '',
    name: '',
    image: '',
    birthday: '',
    team: {
      name: '',
    },
  });

  // Fetching the data to showcase in the component
  const loadCoach = async () => {
    try {
      const response = await getCoach(envConfig.apiUrl, coachSlug);
      setCoachData({
        slug: response.slug,
        name: response.name,
        image: response.image,
        birthday: response.birthday,
        team: {
          name: response.team.name,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const club = useGetClub(envConfig.apiUrl, clubSlug);
  const coaches = useGetCoaches(envConfig.apiUrl, teamSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      await loadCoach();
    })();
  }, [coachSlug]);

  useEffect(() => {
    document.title = `${coachData.name} • The Ballers`;
  }, [coachData]);

  return (
    <>
      {coaches.length > 0 ? (
        <main className='player-coach__container'>
          <section className='cover'>
            <img className='cover--image' src={club.logo} alt='Cover' />
          </section>

          <section className='actor'>
            <div className='actor__container'>
              <img className='actor__container--image' src={coachData.image} alt='Coach photo' />
              <div className='actor__info'>
                <div className='actor__header'>
                  <h1 className='actor__info--name'>{coachData.name}</h1>
                  {localStorage.getItem('slug') ? (
                    <ButtonContainer>
                      <SecondaryButton name='Edit coach' route={`/edit-coach/${coachData.slug}`} />
                    </ButtonContainer>
                  ) : null}
                </div>
                <div className='actor__info-about'>
                  <p>
                    <strong>Team: </strong>
                    {coachData.team.name}
                  </p>
                  <p>
                    <strong>Birth: </strong>
                    {coachData.birthday}
                  </p>
                </div>
              </div>
            </div>

            <section className='actors'>
              <div className='actors__container'>
                <h2 className='actors__container--title'>More coaches</h2>
                <div className='more-actors'>
                  {coaches.map((coach) => (
                    <MoreActors
                      coach={coach}
                      key={coach.slug}
                      name={coach.name}
                      image={coach.image}
                      route={`/club/${club.slug}/team/${coachData.team.slug}/coach/${coach.slug}`}
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

export default Coach;
