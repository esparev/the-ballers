import React from 'react';
import Actor from '../components/Actor.jsx';
import ButtonContainer from './ButtonContainer.jsx';
import YellowButton from '../components/YellowButton.jsx';
import '../assets/styles/components/TeamPlayers.scss';
import userIcon from '../assets/icons/user-icon.svg';

const Admins = () => {
  return (
    <main className='admins'>
      <div className='players-coach'>
        <section className='actors'>
          <div className='actors__container'>
            <h2 className='actors__container--title'>Administradores</h2>
            <div className='more-actors'>
              <Actor
                name='Nombre Administrador'
                image={userIcon}
                route='/admins/admin'
              />
              <Actor
                name='Nombre Administrador'
                image={userIcon}
                route='/admins/admin'
              />
              <Actor
                name='Nombre Administrador'
                image={userIcon}
                route='/admins/admin'
              />
              <Actor
                name='Nombre Administrador'
                image={userIcon}
                route='/admins/admin'
              />
              <Actor
                name='Nombre Administrador'
                image={userIcon}
                route='/admins/admin'
              />
              <Actor
                name='Nombre Administrador'
                image={userIcon}
                route='/admins/admin'
              />
            </div>
          </div>
        </section>
      </div>

      <ButtonContainer>
        <YellowButton name='Nuevo Administrador' route='/admins/nuevo-admin' />
      </ButtonContainer>
    </main>
  );
};

export default Admins;
