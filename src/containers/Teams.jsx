import React, { useEffect } from 'react';
import Entity from '@components/Entity';
import PrimaryButton from '@components/PrimaryButton';
import SecondaryButton from '@components/SecondaryButton';
import EntityContainer from '@containers/EntityContainer';
import ButtonContainer from '@containers/ButtonContainer';
import useGetClub from '@hooks/useGetClub';
import useGetAddress from '@hooks/useGetAddress';
import useGetTeams from '@hooks/useGetTeams';
import { envConfig } from '@config';
import '@styles/Teams.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the league teams page with all its functions
 * stored inside for its full operation
 * @param {*} props
 * @returns JSX code to render to the DOM tree
 */
const Teams = (props) => {
  // Assigns the league's id from the URL to the id props
  const { slug } = props.match.params;

  // Fetching the necessary data to showcase in the component
  const league = useGetClub(envConfig.apiUrl, slug);
  const address = useGetAddress(envConfig.apiUrl, slug);
  const teams = useGetTeams(envConfig.apiUrl, slug);

  // Setting the admin's id to have data persistency only on local storage
  localStorage.setItem('selected league', league.id);

  useEffect(() => {
    document.title = 'The Ballers • Club';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div id='message-container'></div>

      <main className='club-teams'>
        <section className='club'>
          <div className='club__main'>
            <img className='club--image' src={league.logo} alt={`Logo de ${league.logo}`} />
            <div className='club__main-info'>
              <h1 className='club--title'>{league.name}</h1>
              {localStorage.getItem('id') ? (
                <ButtonContainer>
                  <PrimaryButton name='Create team' route={`/new-team`} />
                  <SecondaryButton name='Edit club' route={`/edit-club/${league.slug}`} />
                </ButtonContainer>
              ) : null}
            </div>
          </div>

          <div className='club__info'>
            <div>
              {league.responsable ? (
                <p>
                  <strong>Responsible: </strong>
                  {league.responsable}
                </p>
              ) : null}
              {league.phone ? (
                <p>
                  <strong>Phone number: </strong>
                  {league.phone}
                </p>
              ) : null}
            </div>
            <div>
              <p>
                <strong>Location: </strong>
                {address.location}
              </p>
              <p>
                <strong>Address: </strong>
                {`${address.streetName} ${address.streetNumber}, ${address.zipCode} ${address.suburb}, Mich.`}
              </p>
            </div>
            <div>
              <p>
                <strong>Age range: </strong>
                {`${league.ageStart} - ${league.ageEnd}`}
              </p>
            </div>
          </div>
        </section>

        <section className='teams'>
          <h1 className='teams--title'>Teams</h1>
          {teams.length > 0 && (
            <EntityContainer>
              {teams.map((team) => (
                <Entity
                  team={team}
                  key={team.slug}
                  name={team.name}
                  logo={team.logo}
                  route={`/club/${league.slug}/${team.slug}`}
                />
              ))}
            </EntityContainer>
          )}
          {teams.length === 0 && <h2 className='no-teams'>This club doesn't have teams yet</h2>}
        </section>
      </main>
    </>
  );
};

export default Teams;
