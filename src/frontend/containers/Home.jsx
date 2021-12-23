import React, { useEffect } from 'react';
import moment from 'moment';
import EntityContainer from './EntityContainer';
import Entity from '../components/Entity';
import Article from '../components/Article';
import Card from '../components/Card';
import YellowButton from '../components/YellowButton';
import sortByDate from '../utils/functions/sortByDate';
import useGetNews from '../hooks/useGetNews';
import useGetLeagues from '../hooks/useGetLeagues';
import useGetTournaments from '../hooks/useGetTournaments';
import { envConfig } from '../utils/config';
import '../assets/styles/App.scss';
import '../assets/styles/components/Home.scss';

const Home = () => {
  useEffect(() => {
    document.title = 'BEISMICH';
    window.scrollTo(0, 0);
  }, []);

  moment.locale('es');

  let leagues = useGetLeagues(envConfig.apiUrl);
  let news = useGetNews(envConfig.apiUrl);
  let tournaments = useGetTournaments(envConfig.apiUrl);

  // Sorting news and tournaments by most recent date
  sortByDate(news);
  sortByDate(tournaments);

  // Slicing leagues, news and tournaments to not show all of them
  leagues = leagues.slice(0, 6);
  news = news.slice(0, 9);
  tournaments = tournaments.slice(0, 9);

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
              route={`/ligas/liga/${league.id}`}
            />
          ))}
        </EntityContainer>
      </section>

      <section className='news-tournaments'>
        <section className='news'>
          <h2 className='news--title'>Noticias</h2>
          {news.map((news) => (
            <Card
              news={news}
              key={news.id}
              title={news.title}
              cover={news.cover}
              date={moment(news.createdAt).format('DD MMMM, YYYY')}
              category='Noticia'
              description={
                news.description.length > 255
                  ? `${news.description.substring(0, 255)}...`
                  : news.description
              }
              route={`/noticias/noticia/${news.id}`}
            />
          ))}
        </section>
        <section className='tournaments'>
          <h2 className='tournaments--title'>Torneos</h2>
          {tournaments.map((tournament) => (
            <Article
              tournament={tournament}
              key={tournament.id}
              title={tournament.title}
              cover={tournament.cover}
              date={moment(tournament.createdAt).format('DD MMMM, YYYY')}
              category='Torneo'
              route={`/torneos/torneo/${tournament.id}`}
            />
          ))}
        </section>
      </section>
    </>
  );
};

export default Home;
