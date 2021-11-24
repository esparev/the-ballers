import React from 'react';
import MoreActors from '../components/MoreActors.jsx';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import '../assets/styles/components/ActorContainer.scss';
import userIcon from '../assets/icons/user-icon.svg';

const Admin = () => {
  return (
    <main>
      <section class='actor'>
        <div class='actor__container'>
          <img
            class='actor__container--image'
            src={userIcon}
            alt='Foto del administrador'
          />
          <div class='actor__info'>
            <h1 class='actor__info--name'>Nombre Administrador</h1>
            <div class='actor__info-about'>
              <p>
                <strong>Correo electrónico: </strong>admin@mail.com
              </p>
            </div>
          </div>
        </div>

        <section class='actors'>
          <div class='actors__container'>
            <h2 class='actors__container--title'>Más Administradores</h2>
            <div class='more-actors'>
              <MoreActors
                name='Nombre Administrador'
                image={userIcon}
                route='/admins/admin'
              />
              <MoreActors
                name='Nombre Administrador'
                image={userIcon}
                route='/admins/admin'
              />
              <MoreActors
                name='Nombre Administrador'
                image={userIcon}
                route='/admins/admin'
              />
              <MoreActors
                name='Nombre Administrador'
                image={userIcon}
                route='/admins/admin'
              />
              <MoreActors
                name='Nombre Administrador'
                image={userIcon}
                route='/admins/admin'
              />
              <MoreActors
                name='Nombre Administrador'
                image={userIcon}
                route='/admins/admin'
              />
            </div>
          </div>
        </section>

        <ButtonContainer>
          <GrayButton
            name='Editar Administrador'
            route='/admins/admin/editar-administrador'
          />
        </ButtonContainer>
      </section>
    </main>
  );
};

export default Admin;
