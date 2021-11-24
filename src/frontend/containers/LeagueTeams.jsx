import React, { useEffect } from 'react';
import EntityContainer from './EntityContainer.jsx';
import Entity from '../components/Entity.jsx';
import '../assets/styles/components/LeagueTeams.scss';
import cupatizioLogo from '../assets/static/cupatizio-logo.png';
import unknownTeamLogo from '../assets/icons/unknown-team-icon.png';
import ButtonContainer from './ButtonContainer';
import YellowButton from '../components/YellowButton';

const LeagueTeams = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Liga';
  }, []);

  return (
    <main className='league-teams'>
      <section className='league'>
        <div className='league__main'>
          <img className='league--image' src={cupatizioLogo} alt='' />
          <h1 className='league--title'>Liga Amigos del Cupatizio</h1>
        </div>

        <div className='league__info'>
          <div>
            <p>
              <strong>Responsable: </strong>Nombre responsable
            </p>
            <p>
              <strong>Teléfono: </strong>0000000000
            </p>
          </div>
          <div>
            <p>
              <strong>Localidad: </strong>Ciudad/Municipio
            </p>
            <p>
              <strong>Dirección: </strong>Calle 00, 00000 Colonia, Mich
            </p>
          </div>
          <div>
            <p>
              <strong>Rango de edad: </strong>00 - 00
            </p>
          </div>
        </div>
      </section>

      <section className='teams'>
        <h1 className='teams--title'>Equipos</h1>

        <EntityContainer>
          <Entity
            name='Nombre Equipo'
            logo={unknownTeamLogo}
            route='/ligas/liga/equipo'
          />
          <Entity
            name='Nombre Equipo'
            logo={unknownTeamLogo}
            route='/ligas/liga/equipo'
          />
          <Entity
            name='Nombre Equipo'
            logo={unknownTeamLogo}
            route='/ligas/liga/equipo'
          />
          <Entity
            name='Nombre Equipo'
            logo={unknownTeamLogo}
            route='/ligas/liga/equipo'
          />
        </EntityContainer>
      </section>

      <ButtonContainer>
        <YellowButton name='Nuevo Equipo' route='/ligas/liga/nuevo-equipo' />
      </ButtonContainer>
    </main>
  );
};

export default LeagueTeams;
