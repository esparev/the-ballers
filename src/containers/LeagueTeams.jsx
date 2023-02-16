import React, { useEffect } from 'react';
import Entity from '@components/Entity';
import YellowButton from '@components/YellowButton';
import GrayButton from '@components/GrayButton';
import EntityContainer from '@containers/EntityContainer';
import ButtonContainer from '@containers/ButtonContainer';
import useGetLeague from '@hooks/useGetLeague';
import useGetAddress from '@hooks/useGetAddress';
import useGetTeams from '@hooks/useGetTeams';
import { envConfig } from '@config';
import '@styles/LeagueTeams.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the league teams page with all its functions
 * stored inside for its full operation
 * @param {*} props
 * @returns JSX code to render to the DOM tree
 */
const LeagueTeams = (props) => {
  // Assigns the league's id from the URL to the id props
  const { slug } = props.match.params;

  // Fetching the necessary data to showcase in the component
  const league = useGetLeague(envConfig.apiUrl, slug);
  const address = useGetAddress(envConfig.apiUrl, slug);
  const teams = useGetTeams(envConfig.apiUrl, slug);

  // Setting the admin's id to have data persistency only on local storage
  localStorage.setItem('selected league', league.id);

  useEffect(() => {
    document.title = 'BEISMICH • Liga';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div id='message-container'></div>

      <main className='league-teams'>
        <section className='league'>
          <div className='league__main'>
            <img
              className='league--image'
              src={league.logo}
              alt={`Logo de ${league.logo}`}
            />
            <h1 className='league--title'>{league.name}</h1>
          </div>

          <div className='league__info'>
            <div>
              {league.responsable ? (
                <p>
                  <strong>Responsable: </strong>
                  {league.responsable}
                </p>
              ) : null}
              {league.phone ? (
                <p>
                  <strong>Teléfono: </strong>
                  {league.phone}
                </p>
              ) : null}
            </div>
            <div>
              <p>
                <strong>Localidad: </strong>
                {address.location}
              </p>
              <p>
                <strong>Dirección: </strong>
                {`${address.streetName} ${address.streetNumber}, ${address.zipCode} ${address.suburb}, Mich.`}
              </p>
            </div>
            <div>
              <p>
                <strong>Rango de edad: </strong>
                {`${league.ageStart} - ${league.ageEnd} años`}
              </p>
            </div>
          </div>
        </section>

        <section className='teams'>
          <h1 className='teams--title'>Equipos</h1>
          {teams.length > 0 && (
            <EntityContainer>
              {teams.map((team) => (
                <Entity
                  team={team}
                  key={team.id}
                  name={team.name}
                  logo={team.logo}
                  route={`/ligas/${league.id}/${team.id}`}
                />
              ))}
            </EntityContainer>
          )}
          {teams.length === 0 && (
            <h2 className='no-teams'>Esta liga aún no tiene equipos</h2>
          )}
        </section>

        <section className='join-league'>
          <div className='join-league__message'>
            <h1 className='join-league__message--title'>
              ¿Quieres formar parte de esta liga?
            </h1>
            <p className='join-league__message--text'>
              Para formar parte de esta liga descarga la hoja de registro y
              llévala a la dirección donde se encuentra la liga. También puedes
              ponerte en contacto con el responsable de la liga.
            </p>
            {league.ageEnd < 18 ? (
              <a
                className='button yellow-button'
                href='https://drive.google.com/uc?id=1EcyOMFxl525CFiRZu0LYY8VBKObdwCdz&export=download'
                style={{ marginRight: 0 }}
              >
                Descargar hoja de registro
              </a>
            ) : (
              <a
                className='button yellow-button'
                href='https://drive.google.com/uc?id=1ZsGEEBAAC5O1UOlOMhUv_fyErUKX2BVD&export=download'
                style={{ marginRight: 0 }}
              >
                Descargar hoja de registro
              </a>
            )}
          </div>
        </section>

        {localStorage.getItem('id') ? (
          <ButtonContainer>
            <YellowButton
              name='Nuevo Equipo'
              route={`/ligas/${league.id}/nuevo-equipo`}
            />
            <GrayButton
              name='Editar Liga'
              route={`/ligas/${league.id}/editar-liga`}
            />
          </ButtonContainer>
        ) : null}
      </main>
    </>
  );
};

export default LeagueTeams;
