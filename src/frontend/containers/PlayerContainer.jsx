import React from 'react';
import MoreActors from '../components/MoreActors.jsx';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import '../assets/styles/components/ActorContainer.scss';
import cupatizioLogo from '../assets/static/cupatizio-logo.png';
import userIcon from '../assets/icons/user-icon.svg';

const PlayerContainer = () => {
  return (
    <main>
      <section class='cover'>
        <img class='cover--image' src={cupatizioLogo} alt='Portada' />
      </section>

      <section class='actor'>
        <div class='actor__container'>
          <img
            class='actor__container--image'
            src={userIcon}
            alt='Foto del jugador'
          />
          <div class='actor__info'>
            <h1 class='actor__info--name'>Nombre Jugador</h1>
            <div class='actor__info-about'>
              <p>
                <strong>Nombre Equipo: </strong>Nombre Equipo
              </p>
              <p>
                <strong>Posición de juego: </strong>Posición
              </p>
              <p>
                <strong>Fecha de Nacimiento: </strong>Día Mes Año
              </p>
            </div>
          </div>
        </div>

        <section class='actors'>
          <div class='actors__container'>
            <h2 class='actors__container--title'>Más Jugadores</h2>
            <div class='more-actors'>
              <MoreActors
                name='Nombre Jugador'
                image={userIcon}
                route='/ligas/liga/equipo/jugador'
              />
              <MoreActors
                name='Nombre Jugador'
                image={userIcon}
                route='/ligas/liga/equipo/jugador'
              />
              <MoreActors
                name='Nombre Jugador'
                image={userIcon}
                route='/ligas/liga/equipo/jugador'
              />
              <MoreActors
                name='Nombre Jugador'
                image={userIcon}
                route='/ligas/liga/equipo/jugador'
              />
              <MoreActors
                name='Nombre Jugador'
                image={userIcon}
                route='/ligas/liga/equipo/jugador'
              />
              <MoreActors
                name='Nombre Jugador'
                image={userIcon}
                route='/ligas/liga/equipo/jugador'
              />
            </div>
          </div>
        </section>

        <ButtonContainer>
          <GrayButton
            name='Editar Jugador'
            route='/ligas/liga/equipo/jugador/editar-jugador'
          />
        </ButtonContainer>
      </section>
    </main>
  );
};

export default PlayerContainer;
