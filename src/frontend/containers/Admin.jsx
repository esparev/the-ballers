import React, { useEffect, useState } from 'react';
import MoreActors from '../components/MoreActors';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import useGetAdmins from '../hooks/useGetAdmins';
import '../assets/styles/components/ActorContainer.scss';

const API = 'https://beismich.herokuapp.com/api/v1';

const Admin = (props) => {
  const { id } = props.match.params;

  const admin = useGetAdmins(`${API}/admins/${id}`);
  const admins = useGetAdmins(`${API}/admins`);
  localStorage.setItem('selected admin', admin.id);

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
                <strong>Correo electrónico: </strong>
                {admin.email}
              </p>
            </div>
          </div>
        </div>

        <section className='actors'>
          <div className='actors__container'>
            <h2 className='actors__container--title'>Más Administradores</h2>
            <div className='more-actors'>
              {admins.map((admin) => (
                <MoreActors
                  admin={admin}
                  key={admin.id}
                  name={admin.name}
                  image={admin.image}
                  route={`/admins/admin/${admin.id}`}
                />
              ))}
            </div>
          </div>
        </section>

        <ButtonContainer>
          {localStorage.getItem('role') === 'hero' ? (
            <GrayButton
              name='Editar Administrador'
              route={`/admins/admin/${admin.id}/editar-admin`}
            />
          ) : null}
        </ButtonContainer>
      </section>
    </main>
  );
};

export default Admin;
