import React from 'react';
import Actor from '../components/Actor.jsx';
import ButtonContainer from './ButtonContainer.jsx';
import YellowButton from '../components/YellowButton.jsx';
import GrayButton from '../components/GrayButton.jsx';
import '../assets/styles/components/TeamPlayers.scss';
import unknownTeamLogo from '../assets/icons/unknown-team-icon.png';
import userIcon from '../assets/icons/user-icon.svg';

const TeamPlayers = () => {
  return (
    <main className='team-players'>
      <section className='team'>
        <div className='team__main'>
          <img
            className='team--image'
            src={unknownTeamLogo}
            alt='Logo del equipo'
          />
          <h1 className='team--title'>Nombre Equipo</h1>
        </div>
        <div className='team__info'>
          <div>
            <p>
              <strong>Manager: </strong>Nombre manager
            </p>
            <p>
              <strong>Liga: </strong>Liga Amigos del Cupatizio
            </p>
          </div>
        </div>
      </section>

      <div className='players-coach'>
        <section className='actors'>
          <div className='actors__container'>
            <h2 className='actors__container--title'>Jugadores</h2>
            <div className='more-actors'>
              <Actor
                name='Nombre Jugador'
                image={userIcon}
                position='Posición'
                route='/ligas/liga/equipo/jugador'
              />
              <Actor
                name='Nombre Jugador'
                image={userIcon}
                position='Posición'
                route='/ligas/liga/equipo/jugador'
              />
              <Actor
                name='Nombre Jugador'
                image={userIcon}
                position='Posición'
                route='/ligas/liga/equipo/jugador'
              />
              <Actor
                name='Nombre Jugador'
                image={userIcon}
                position='Posición'
                route='/ligas/liga/equipo/jugador'
              />
              <Actor
                name='Nombre Jugador'
                image={userIcon}
                position='Posición'
                route='/ligas/liga/equipo/jugador'
              />
              <Actor
                name='Nombre Jugador'
                image={userIcon}
                position='Posición'
                route='/ligas/liga/equipo/jugador'
              />
            </div>
          </div>
        </section>

        <section className='actors'>
          <div className='actors__container'>
            <h2 className='actors__container--title'>Entrenador</h2>
            <div className='more-actors'>
              <Actor
                name='Nombre Entrenador'
                image={userIcon}
                route='/ligas/liga/equipo/entrenador'
              />
            </div>
          </div>
        </section>
      </div>

      <ButtonContainer>
        <YellowButton name='Nuevo Jugador/Entrenador' route='/ligas/liga/equipo/nuevo-jugador-entrenador-pending' />
        <GrayButton name='Editar Equipo' route='/ligas/liga/equipo/editar-equipo' />
      </ButtonContainer>
    </main>
  );
};

export default TeamPlayers;
