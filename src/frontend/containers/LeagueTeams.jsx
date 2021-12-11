import React, { useEffect } from 'react';
import EntityContainer from './EntityContainer';
import Entity from '../components/Entity';
import ButtonContainer from './ButtonContainer';
import YellowButton from '../components/YellowButton';
import GrayButton from '../components/GrayButton';
import useGetLeague from '../hooks/useGetLeague';
import useGetAddress from '../hooks/useGetAddress';
import useGetTeams from '../hooks/useGetTeams';
import '../assets/styles/components/LeagueTeams.scss';

const API = `https://beismich.herokuapp.com/api/v1`;

const LeagueTeams = (props) => {
  const { match } = props;
  const { id } = match.params;

  const league = useGetLeague(API, id);
  const address = useGetAddress(API, id);
  const teams = useGetTeams(API);
  const leagueTeams = teams.filter((teamItem) => teamItem.leagueId === id);
  console.log('LEAGUE TEAMS');
  console.log(leagueTeams);

  useEffect(() => {
    document.title = `BEISMICH • ${league.name}`;
    window.scrollTo(0, 0);
  }, [league.name]);

  return (
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
            <p>
              <strong>Responsable: </strong>
              {league.responsable}
            </p>
            <p>
              <strong>Teléfono: </strong>
              {league.phone}
            </p>
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
              {`${league.ageStart} - ${league.ageEnd}`}
            </p>
          </div>
        </div>
      </section>

      <section className='teams'>
        {leagueTeams.length > 0 ? (
          <>
            <h1 className='teams--title'>Equipos</h1>

            <EntityContainer>
              {leagueTeams.map((team) => (
                <Entity
                  team={team}
                  key={team.id}
                  name={team.name}
                  logo={team.logo}
                  route={`/ligas/${id}/equipo/${team.id}`}
                />
              ))}
            </EntityContainer>
          </>
        ) : (
          <h1 className='teams--title'>Esta liga no tiene equipos</h1>
        )}
      </section>
      <ButtonContainer>
        <YellowButton name='Nuevo Equipo' route={`/ligas/${id}/nuevo-equipo`} />
        <GrayButton name='Editar Liga' route={`/ligas/${id}/editar-liga`} />
      </ButtonContainer>
    </main>
  );
};

export default LeagueTeams;
