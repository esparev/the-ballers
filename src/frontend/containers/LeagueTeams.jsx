import React, { useEffect } from 'react';
import EntityContainer from './EntityContainer';
import Entity from '../components/Entity';
import ButtonContainer from './ButtonContainer';
import YellowButton from '../components/YellowButton';
import GrayButton from '../components/GrayButton';
import useGetLeague from '../hooks/useGetLeague';
import useGetAddress from '../hooks/useGetAddress';
import useGetTeams from '../hooks/useGetTeams';
import { envConfig } from '../utils/config';
import '../assets/styles/components/LeagueTeams.scss';

const LeagueTeams = (props) => {
  const { id } = props.match.params;

  const league = useGetLeague(envConfig.apiUrl, id);
  const address = useGetAddress(envConfig.apiUrl, id);
  const teams = useGetTeams(envConfig.apiUrl, id);

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
                  route={`/ligas/liga/${league.id}/equipo/${team.id}`}
                />
              ))}
            </EntityContainer>
          )}
          {teams.length === 0 && (
            <h2 className='no-teams'>Esta liga aún no tiene equipos</h2>
          )}
        </section>

        {localStorage.getItem('id') ? (
          <ButtonContainer>
            <YellowButton
              name='Nuevo Equipo'
              route={`/ligas/liga/${league.id}/nuevo-equipo`}
            />
            <GrayButton
              name='Editar Liga'
              route={`/ligas/liga/${league.id}/editar-liga`}
            />
          </ButtonContainer>
        ) : null}
      </main>
    </>
  );
};

export default LeagueTeams;
