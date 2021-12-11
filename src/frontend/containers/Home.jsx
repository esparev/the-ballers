import React, { useEffect } from 'react';
import EntityContainer from './EntityContainer';
import Entity from '../components/Entity';
import Article from '../components/Article';
import Card from '../components/Card';
import YellowButton from '../components/YellowButton';
import useGetLeagues from '../hooks/useGetLeagues';
import '../assets/styles/App.scss';
import '../assets/styles/components/Home.scss';

const API = 'https://beismich.herokuapp.com/api/v1';

const Home = () => {
  useEffect(() => {
    document.title = 'BEISMICH';
    window.scrollTo(0, 0);
  }, []);

  const leagues = useGetLeagues(API);

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
