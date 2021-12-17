import React, { useEffect } from 'react';
import Actor from '../components/Actor';
import ButtonContainer from './ButtonContainer';
import YellowButton from '../components/YellowButton';
import useGetAdmins from '../hooks/useGetAdmins';
import '../assets/styles/components/TeamPlayers.scss';
// import userIcon from '../assets/icons/user-icon.svg';

// const API = 'https://beismich.herokuapp.com/api/v1/admins';

const Admins = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Administradores';
    window.scrollTo(0, 0);
  }, []);

  // const admins = useGetAdmins(API);

  return (
    <main className='admins'>
      <div className='players-coach'>
        <section className='actors'>
          <h2 className='actors--title'>Administradores</h2>
          <div className='actors__container'>
            {/* {admins.map((admin) => (
              <Actor
                admin={admin}
                key={admin.id}
                name={admin.name}
                image={admin.image}
                route='/admins/admin'
              />
            ))} */}
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
