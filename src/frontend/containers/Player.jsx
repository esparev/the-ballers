import React, { useEffect } from 'react';
import MoreActors from '../components/MoreActors';
import Message from '../components/Message';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import '../assets/styles/components/ActorContainer.scss';

const Player = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Jugador';
    window.scrollTo(0, 0);
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
            src='https://imgur.com/CFJ2k8J'
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
                image='https://imgur.com/CFJ2k8J'
                route='/ligas/liga/equipo/jugador'
              />
              <MoreActors
                name='Nombre Jugador'
                image='https://imgur.com/CFJ2k8J'
                route='/ligas/liga/equipo/jugador'
              />
              <MoreActors
                name='Nombre Jugador'
                image='https://imgur.com/CFJ2k8J'
                route='/ligas/liga/equipo/jugador'
              />
              <MoreActors
                name='Nombre Jugador'
                image='https://imgur.com/CFJ2k8J'
                route='/ligas/liga/equipo/jugador'
              />
              <MoreActors
                name='Nombre Jugador'
                image='https://imgur.com/CFJ2k8J'
                route='/ligas/liga/equipo/jugador'
              />
              <MoreActors
                name='Nombre Jugador'
                image='https://imgur.com/CFJ2k8J'
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
