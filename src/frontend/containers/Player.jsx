import React, { useEffect } from 'react';
import MoreActors from '../components/MoreActors.jsx';
import Message from '../components/Message.jsx';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import '../assets/styles/components/ActorContainer.scss';
import cupatizioLogo from '../assets/static/cupatizio-logo.png';
import userIcon from '../assets/icons/user-icon.svg';

const Player = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Jugador';
  }, []);

  const showMessage = () => {
    var main = document.getElementById('app');
    var message = document.getElementById('message');
    main.append(<Message />);
  };

  return (
    <main>
      <section className='cover'>
        <img className='cover--image' src={cupatizioLogo} alt='Portada' />
      </section>

      <section className='actor'>
        <div className='actor__container'>
          <img
            className='actor__container--image'
            src={userIcon}
            alt='Foto del jugador'
          />
          <div className='actor__info'>
            <h1 className='actor__info--name'>Nombre Jugador</h1>
            <div className='actor__info-about'>
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

        <section className='actors'>
          <div className='actors__container'>
            <h2 className='actors__container--title'>Más Jugadores</h2>
            <div className='more-actors'>
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

export default Player;
