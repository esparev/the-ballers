import React, { useEffect } from 'react';
import EntityContainer from './EntityContainer';
import Entity from '../components/Entity';
import ButtonContainer from './ButtonContainer';
import YellowButton from '../components/YellowButton';
import useGetLeagues from '../hooks/useGetLeagues';
import { envConfig } from '../utils/config';
import '../assets/styles/components/Entities.scss';

const Leagues = () => {
  const leagues = useGetLeagues(envConfig.apiUrl);

  const loadPage = (location) => {
    window.location.href = location;
    setTimeout(window.location.reload(), 500);
  };

  const handleLoad = () => {
    loadPage('/#/ligas/nueva-liga');
  };

  useEffect(() => {
    document.title = 'BEISMICH • Ligas';
    window.scrollTo(0, 0);
  }, []);

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
            {/* <YellowButton name='Nueva Liga' route='/ligas/nueva-liga' /> */}
            <button className='button yellow-button' onClick={handleLoad}>
              Nueva Liga
            </button>
          </ButtonContainer>
        ) : null}
      </section>
    </main>
  );
};

export default Leagues;
