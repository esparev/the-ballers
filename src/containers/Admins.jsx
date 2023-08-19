import React, { useEffect } from 'react';
import AdminActor from '@components/AdminActor';
import PrimaryButton from '@components/Buttons/PrimaryButton';
import ButtonContainer from '@containers/ButtonContainer';
import ServerError from '@containers/ServerError';
import useGetAdmins from '@hooks/useGetAdmins';
import { envConfig } from '@config';
import '@styles/TeamPlayers.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the admins page with all its functions
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const Admins = () => {
  // Fetching the necessary data to showcase in the component
  const admins = useGetAdmins(envConfig.apiUrl);

  useEffect(() => {
    document.title = 'Admins • The Ballers';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {admins.length > 0 ? (
        <main className='admins'>
          <div className='admins__container-card'>
            <div className='players-coach'>
              <section className='admins'>
                <h2 className='admins--title'>Admins</h2>
                <div className='admins__container'>
                  {admins.map((admin) => (
                    <AdminActor
                      admin={admin}
                      key={admin.slug}
                      name={admin.name}
                      image={admin.image}
                      route={`/admin/${admin.slug}`}
                    />
                  ))}
                </div>
              </section>
            </div>

            <ButtonContainer>
              <PrimaryButton name='Create admin' route='/new-admin' />
            </ButtonContainer>
          </div>
        </main>
      ) : (
        <ServerError />
      )}
    </>
  );
};

export default Admins;
