import React, { useEffect } from 'react';
import AdminActor from '../components/AdminActor';
import ButtonContainer from './ButtonContainer';
import YellowButton from '../components/YellowButton';
import useGetAdmins from '../hooks/useGetAdmins';
import '../assets/styles/components/TeamPlayers.scss';

const API = 'https://beismich.herokuapp.com/api/v1';

const Admins = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Administradores';
    window.scrollTo(0, 0);
  }, []);

  const admins = useGetAdmins(`${API}/admins`);

  return (
    <main className='admins'>
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
        <YellowButton name='Nuevo Administrador' route='/admins/nuevo-admin' />
      </ButtonContainer>
    </main>
  );
};

export default Admins;
