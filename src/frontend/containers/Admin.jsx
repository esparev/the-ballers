import React, { useEffect } from 'react';
import MoreActors from '../components/MoreActors';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import '../assets/styles/components/ActorContainer.scss';

const Admin = ({admin}) => {
  useEffect(() => {
    document.title = 'BEISMICH • Administrador';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <section className='actor'>
        <div className='actor__container'>
          <img
            className='actor__container--image'
            src={admin.image}
            alt='Foto del administrador'
          />
          <div className='actor__info'>
            <h1 className='actor__info--name'>{admin.name}</h1>
            <div className='actor__info-about'>
              <p>
                <strong>Correo electrónico: </strong>{admin.email}
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
                image='https://imgur.com/CFJ2k8J'
                route='/admins/admin'
              />
              <MoreActors
                name='Nombre Administrador'
                image='https://imgur.com/CFJ2k8J'
                route='/admins/admin'
              />
              <MoreActors
                name='Nombre Administrador'
                image='https://imgur.com/CFJ2k8J'
                route='/admins/admin'
              />
              <MoreActors
                name='Nombre Administrador'
                image='https://imgur.com/CFJ2k8J'
                route='/admins/admin'
              />
              <MoreActors
                name='Nombre Administrador'
                image='https://imgur.com/CFJ2k8J'
                route='/admins/admin'
              />
              <MoreActors
                name='Nombre Administrador'
                image='https://imgur.com/CFJ2k8J'
                route='/admins/admin'
              />
            </div>
          </div>
        </section>

        <ButtonContainer>
          <GrayButton
            name='Editar Administrador'
            route='/admins/admin/editar-admin'
          />
        </ButtonContainer>
      </section>
    </main>
  );
};

export default Admin;
