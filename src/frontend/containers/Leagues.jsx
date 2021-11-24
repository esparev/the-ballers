import React, { useEffect } from 'react';
import EntityContainer from './EntityContainer.jsx';
import Entity from '../components/Entity.jsx';
import ButtonContainer from './ButtonContainer.jsx';
import YellowButton from '../components/YellowButton.jsx';
import '../assets/styles/components/Entities.scss';
import purepechasLogo from '../assets/static/purepechas-logo.png';
import cupatizioLogo from '../assets/static/cupatizio-logo.png';
import arienseLogo from '../assets/static/ariense-logo.png';
import lbpLogo from '../assets/static/lbp-logo.png';
import tarascaLogo from '../assets/static/tarasca-logo.png';

const Leagues = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Ligas';
  }, []);

  return (
    <main>
      <section className='entities'>
        <h1 className='entities--title'>Ligas de BEISMICH</h1>

        <EntityContainer>
          <Entity name='Liga Purepechas' logo={purepechasLogo} />
          <Entity name='Liga Amigos del Cupatizio' logo={cupatizioLogo} />
          <Entity name='Liga Ariense' logo={arienseLogo} />
          <Entity name='Liga Purepecha' logo={lbpLogo} />
          <Entity name='Liga Pequeña Tarasca' logo={tarascaLogo} />
        </EntityContainer>

        <ButtonContainer>
          <YellowButton name='Nueva Liga' route='/ligas/nueva-liga' />
        </ButtonContainer>
      </section>
    </main>
  );
};

export default Leagues;
