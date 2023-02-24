import React, { useState, useEffect } from 'react';
import Entity from '@components/Entity';
import PrimaryButton from '@components/PrimaryButton';
import SecondaryButton from '@components/SecondaryButton';
import EntityContainer from '@containers/EntityContainer';
import ButtonContainer from '@containers/ButtonContainer';
import { getClub } from '../api/getClub';
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
  const [clubData, setClubData] = useState({
    slug: '',
    name: '',
    logo: '',
    responsible: '',
    phone: '',
    ageStart: 0,
    ageEnd: 0,
    address: {
      streetName: '',
      streetNumber: '',
      zipCode: '',
      suburb: '',
      location: '',
    },
  });

  const loadClub = async () => {
    try {
      const response = await getClub(envConfig.apiUrl, slug);
      setClubData({
        slug: response.slug,
        name: response.name,
        logo: response.logo,
        responsible: response.responsible,
        phone: response.phone,
        ageStart: response.ageStart,
        ageEnd: response.ageEnd,
        address: {
          streetName: response.address.streetName,
          streetNumber: response.address.streetNumber,
          zipCode: response.address.zipCode,
          suburb: response.address.suburb,
          location: response.address.location,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Fetching the necessary data to showcase in the component
  const teams = useGetTeams(envConfig.apiUrl, slug);

  // Setting the admin's id to have data persistency only on local storage
  localStorage.setItem('selected league', clubData.id);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      await loadClub();
    })();
  }, [slug]);

  useEffect(() => {
    document.title = `${clubData.name} • The Ballers`;
  }, [clubData]);

  return (
    <>
      <div id='message-container'></div>

      <main className='club-teams'>
        <section className='club'>
          <div className='club__main'>
            <img className='club--image' src={clubData.logo} alt={`Logo de ${clubData.logo}`} />
            <div className='club__main-info'>
              <h1 className='club--title'>{clubData.name}</h1>
              {localStorage.getItem('id') ? (
                <ButtonContainer>
                  <PrimaryButton name='Create team' route={`/new-team`} />
                  <SecondaryButton name='Edit club' route={`/edit-club/${clubData.slug}`} />
                </ButtonContainer>
              ) : null}
            </div>
          </div>

          <div className='club__info'>
            <div>
              {clubData.responsible ? (
                <p>
                  <strong>Responsible: </strong>
                  {clubData.responsible}
                </p>
              ) : null}
              {clubData.phone ? (
                <p>
                  <strong>Phone number: </strong>
                  {clubData.phone}
                </p>
              ) : null}
            </div>
            <div>
              <p>
                <strong>Age range: </strong>
                {`${clubData.ageStart} - ${clubData.ageEnd}`}
              </p>
              <p>
                <strong>Address: </strong>
                {`${clubData.address.streetName} ${clubData.address.streetNumber}, ${clubData.address.zipCode}, ${clubData.address.suburb}, ${clubData.address.location}`}
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
                  route={`/club/${clubData.slug}/${team.slug}`}
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
