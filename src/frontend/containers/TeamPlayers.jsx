import React, { useEffect } from 'react';
import Actor from '../components/Actor';
import ButtonContainer from './ButtonContainer';
import YellowButton from '../components/YellowButton';
import GrayButton from '../components/GrayButton';
import '../assets/styles/components/TeamPlayers.scss';
import '../assets/styles/components/FeedbackMessage.scss';
import userIcon from '../assets/icons/user-icon.svg';
import toggleMessage from '../functions/toggleMessage';

const TeamPlayers = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Equipo';
    window.scrollTo(0, 0);

    /**
     * Hides the message
     */
    const hideMessage = () => {
      var message = document.getElementById('feedback-message');
      if (message.style.display === '') {
        message.style.display = 'none';
      }
    };
    hideMessage();
  }, []);

  return (
    <>
      <div className='feedback-message' id='feedback-message'>
        <div className='message__container'>
          <h1 className='message__container--title'>
            ¿Desea agregar a un Jugador o un Entrenador?
          </h1>
          <p className='message__container--text'>
            Elija si decide agregar a un jugador o a un entrenador
          </p>
          <div className='buttons__container'>
            <YellowButton
              name='Jugador'
              route='/ligas/liga/equipo/nuevo-jugador'
            />
            <YellowButton
              name='Entrenador'
              route='/ligas/liga/equipo/nuevo-entrenador'
            />
            <a className='button gray-button' onClick={toggleMessage}>
              Cancelar
            </a>
          </div>
        </div>
      </div>

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
            <h2 className='actors--title'>Jugadores</h2>
            <div className='actors__container'>
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
          </section>

          <section className='actors'>
            <h2 className='actors--title'>Entrenador</h2>
            <div className='actors__container'>
              <Actor
                name='Nombre Entrenador'
                image={userIcon}
                route='/ligas/liga/equipo/entrenador'
              />
            </div>
          </section>
        </div>

        <ButtonContainer>
          <a className='button yellow-button' onClick={toggleMessage}>
            Nuevo Jugador/Entrenador
          </a>
          <GrayButton
            name='Editar Equipo'
            route='/ligas/liga/equipo/editar-equipo'
          />
        </ButtonContainer>
      </main>
    </>
  );
};

export default TeamPlayers;
