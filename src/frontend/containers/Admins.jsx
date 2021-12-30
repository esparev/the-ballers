import React, { useEffect } from 'react';
import AdminActor from '../components/AdminActor';
import ButtonContainer from './ButtonContainer';
import useGetAdmins from '../hooks/useGetAdmins';
import { envConfig } from '../utils/config';
import '../assets/styles/components/TeamPlayers.scss';

const Admins = () => {
  const admins = useGetAdmins(envConfig.apiUrl);

  const loadPage = (location) => {
    window.location.href = location;
    setTimeout(window.location.reload(), 500);
  };

  const handleLoad = () => {
    loadPage('/#/admins/nuevo-admin');
  };

  useEffect(() => {
    document.title = 'BEISMICH • Administradores';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className='admins'>
      <div className='admins__container-card'>
        <div className='players-coach'>
          <section className='admins'>
            <h2 className='admins--title'>Administradores</h2>
            <div className='admins__container'>
              {admins.map((admin) => (
                <AdminActor
                  admin={admin}
                  key={admin.id}
                  name={admin.name}
                  image={admin.image}
                  route={`/admins/admin/${admin.id}`}
                />
              ))}
            </div>
          </section>
        </div>

        <ButtonContainer>
          <button className='button yellow-button' onClick={handleLoad}>
            Nuevo Administrador
          </button>
        </ButtonContainer>
      </div>
    </main>
  );
};

export default Admins;
