import React from 'react';
import MoreActors from '../components/MoreActors.jsx';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import '../assets/styles/components/ActorContainer.scss';
import userIcon from '../assets/icons/user-icon.svg';

const Admin = () => {
  return (
    <main>
      <section className='actor'>
        <div className='actor__container'>
          <img
            className='actor__container--image'
            src={userIcon}
            alt='Foto del administrador'
          />
          <div className='actor__info'>
            <h1 className='actor__info--name'>Nombre Administrador</h1>
            <div className='actor__info-about'>
              <p>
                <strong>Correo electrónico: </strong>admin@mail.com
              </p>
            </div>
          </div>
        </div>

        <section className='actors'>
          <div className='actors__container'>
            <h2 className='actors__container--title'>Más Administradores</h2>
            <div className='more-actors'>
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
