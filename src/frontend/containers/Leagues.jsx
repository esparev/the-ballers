import React, { useEffect } from 'react';
import EntityContainer from './EntityContainer';
import Entity from '../components/Entity';
import ButtonContainer from './ButtonContainer';
import YellowButton from '../components/YellowButton';
import useGetLeagues from '../hooks/useGetLeagues';
import { envConfig } from '../utils/config';
import '../assets/styles/components/Entities.scss';

const Leagues = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Ligas';
    window.scrollTo(0, 0);
  }, []);

  const leagues = useGetLeagues(envConfig.apiUrl);

  return (
    <main>
      <section className='entities'>
        <h1 className='entities--title'>Ligas de BEISMICH</h1>

        <EntityContainer>
          {leagues.map((league) => (
            <Entity
              league={league}
              key={league.id}
              name={league.name}
              logo={league.logo}
              route={`/ligas/liga/${league.id}`}
            />
          ))}
        </EntityContainer>

        {localStorage.getItem('id') ? (
          <ButtonContainer>
            <YellowButton name='Nueva Liga' route='/ligas/nueva-liga' />
          </ButtonContainer>
        ) : null}
      </section>
    </main>
  );
};

export default Leagues;
