import React, { useEffect } from 'react';
import Actor from '../components/Actor.jsx';
import ButtonContainer from './ButtonContainer.jsx';
import YellowButton from '../components/YellowButton.jsx';
import '../assets/styles/components/TeamPlayers.scss';
import userIcon from '../assets/icons/user-icon.svg';

const Admins = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Administradores';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className='admins'>
      <div className='players-coach'>
        <section className='actors'>
          <h2 className='actors--title'>Administradores</h2>
          <div className='actors__container'>
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
        </section>
      </div>

      <ButtonContainer>
        <YellowButton name='Nuevo Administrador' route='/admins/nuevo-admin' />
      </ButtonContainer>
    </main>
  );
};

export default Admins;
