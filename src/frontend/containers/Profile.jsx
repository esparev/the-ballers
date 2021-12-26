import React, { useEffect } from 'react';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import useGetAdmin from '../hooks/useGetAdmin';
import { envConfig } from '../utils/config';
import '../assets/styles/components/ActorContainer.scss';

const Profile = () => {
  const id = localStorage.getItem('id');
  const admin = useGetAdmin(envConfig.apiUrl, id);
  localStorage.setItem('selected admin', id);

  useEffect(() => {
    document.title = 'BEISMICH • Administrador';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className='profile'>
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

        <ButtonContainer>
          <GrayButton
            name='Editar Perfil'
            route={`/admins/admin/${id}/editar-admin`}
          />
        </ButtonContainer>
      </section>
    </main>
  );
};

export default Profile;
