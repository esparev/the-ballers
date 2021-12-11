import React, { useEffect } from 'react';
import EntityContainer from './EntityContainer';
import Entity from '../components/Entity';
import ButtonContainer from './ButtonContainer';
import YellowButton from '../components/YellowButton';
import useGetLeagues from '../hooks/useGetLeagues';
import '../assets/styles/components/Entities.scss';

const API = 'https://beismich.herokuapp.com/api/v1';

const Leagues = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Ligas';
    window.scrollTo(0, 0);
  }, []);

  const leagues = useGetLeagues(API);

  return (
    <main>
      <section className='entities'>
        {leagues.length > 0 ? (
          <>
            <h1 className='entities--title'>Ligas de BEISMICH</h1>
            <EntityContainer>
              {leagues.map((league) => (
                <Entity
                  league={league}
                  key={league.id}
                  name={league.name}
                  logo={league.logo}
                  {...league}
                  route={`/ligas/${league.id}`}
                />
              ))}
            </EntityContainer>
          </>
        ) : (
          <h1 className='entities--title'>No hay ligas</h1>
        )}

        <ButtonContainer>
          <YellowButton name='Nueva Liga' route='/ligas/nueva-liga' />
        </ButtonContainer>
      </section>
    </main>
  );
};

export default Leagues;
