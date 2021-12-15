import React, { useEffect } from 'react';
import MoreActors from '../components/MoreActors.jsx';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import '../assets/styles/components/ActorContainer.scss';
import cupatizioLogo from '../assets/static/cupatizio-logo.png';
import userIcon from '../assets/icons/user-icon.svg';

const Coach = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Entrenador';
    window.scrollTo(0, 0);
  }, []);

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
            alt='Foto del entrenador'
          />
          <div className='actor__info'>
            <h1 className='actor__info--name'>Nombre Entrenador</h1>
            <div className='actor__info-about'>
              <p>
                <strong>Nombre Equipo: </strong>Nombre Equipo
              </p>
              <p>
                <strong>Fecha de Nacimiento: </strong>Día Mes Año
              </p>
            </div>
          </div>
        </div>

        <section className='actors'>
          <div className='actors__container'>
            <h2 className='actors__container--title'>Más Entrenadores</h2>
            <div className='more-actors'>
              <MoreActors
                name='Nombre Entrenador'
                image={userIcon}
                route='/ligas/liga/equipo/entrenador'
              />
              <MoreActors
                name='Nombre Entrenador'
                image={userIcon}
                route='/ligas/liga/equipo/entrenador'
              />
              <MoreActors
                name='Nombre Entrenador'
                image={userIcon}
                route='/ligas/liga/equipo/entrenador'
              />
              <MoreActors
                name='Nombre Entrenador'
                image={userIcon}
                route='/ligas/liga/equipo/entrenador'
              />
              <MoreActors
                name='Nombre Entrenador'
                image={userIcon}
                route='/ligas/liga/equipo/entrenador'
              />
              <MoreActors
                name='Nombre Entrenador'
                image={userIcon}
                route='/ligas/liga/equipo/entrenador'
              />
            </div>
          </div>
        </section>

        {localStorage.getItem('id') ? (
          <ButtonContainer>
            <GrayButton
              name='Editar Entrenador'
              route='/ligas/liga/equipo/entrenador/editar-entrenador'
            />
          </ButtonContainer>
        ) : null}
      </section>
    </main>
  );
};

export default Coach;
