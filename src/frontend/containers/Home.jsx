import React, { useEffect } from 'react';
import EntityContainer from './EntityContainer.jsx';
import Entity from '../components/Entity.jsx';
import Article from '../components/Article.jsx';
import Card from '../components/Card.jsx';
import ButtonContainer from './ButtonContainer.jsx';
import YellowButton from '../components/YellowButton.jsx';
import '../assets/styles/App.scss';
import '../assets/styles/components/Home.scss';
import purepechasLogo from '../assets/static/purepechas-logo.png';
import cupatizioLogo from '../assets/static/cupatizio-logo.png';
import arienseLogo from '../assets/static/ariense-logo.png';
import lbpLogo from '../assets/static/lbp-logo.png';
import tarascaLogo from '../assets/static/tarasca-logo.png';

const Home = () => {
  useEffect(() => {
    document.title = 'BEISMICH';
  }, []);

  return (
    <>
      <main className='slider__container'>
        <section className='slider'>
          <div className='slider__sidebar'>
            <h1 className='slider__sidebar--title'>
              BEISMICH manda liga de Morelia al mundial
            </h1>
            <hr className='slider__sidebar--line' />
            <p className='slider__sidebar--summary'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies
              quis egestas aliquet leo amet, eget. Sit vitae amet, sollicitudin
              ac placerat.
            </p>
            <YellowButton name='Ver más' route='/noticias/noticia' />
          </div>
        </section>
      </main>

      <section className='entities'>
        <h2 className='leagues--title'>Conoce Nuestras Ligas</h2>
        <EntityContainer>
          <Entity
            name='Liga Purepechas'
            logo={purepechasLogo}
            route='/ligas/liga'
          />
          <Entity
            name='Liga Amigos del Cupatizio'
            logo={cupatizioLogo}
            route='/ligas/liga'
          />
          <Entity name='Liga Ariense' logo={arienseLogo} route='/ligas/liga' />
          <Entity name='Liga Purepecha' logo={lbpLogo} route='/ligas/liga' />
          <Entity
            name='Liga Pequeña Tarasca'
            logo={tarascaLogo}
            route='/ligas/liga'
          />
        </EntityContainer>
      </section>

      <section className='news-tournaments'>
        <section className='news'>
          <h2 className='news--title'>Noticias</h2>
          <Card
            title='BEISMICH manda liga de Morelia al mundial'
            date='Octubre 26, 2021'
            category='Noticia'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies quis egestas aliquet leo amet, eget. Sit vitae amet, sollicitudin ac placerat. Pellentesque in enim fusce enim sit mi turpis sed.'
            route='/noticias/noticia'
          />
          <Card
            title='BEISMICH manda liga de Morelia al mundial'
            date='Octubre 26, 2021'
            category='Noticia'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies quis egestas aliquet leo amet, eget. Sit vitae amet, sollicitudin ac placerat. Pellentesque in enim fusce enim sit mi turpis sed.'
            route='/noticias/noticia'
          />
          <Card
            title='BEISMICH manda liga de Morelia al mundial'
            date='Octubre 26, 2021'
            category='Noticia'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies quis egestas aliquet leo amet, eget. Sit vitae amet, sollicitudin ac placerat. Pellentesque in enim fusce enim sit mi turpis sed.'
            route='/noticias/noticia'
          />
        </section>
        <section className='tournaments'>
          <h2 className='tournaments--title'>Torneos</h2>
          <Article
            title='Torneo de TELMEX'
            date='Octubre 26, 2021'
            category='Torneo'
          />
          <Article
            title='Torneo de TELMEX'
            date='Octubre 26, 2021'
            category='Torneo'
          />
        </section>
      </section>
    </>
  );
};

export default Home;
