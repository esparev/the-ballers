import React, { useEffect, useState, useRef } from 'react';
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
// ---------------------------------------- END OF IMPORTS

// Delay time between news for the slideshow
const delay = 10000;

/**
 * Creates the home page with all its functions
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const Home = () => {
  // Setting moment.js to spanish
  moment.locale('es');

  // Fetching the necessary data to showcase in the component
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

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    document.title = 'BEISMICH';

    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === news.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <>
      <main className='slider__container'>
        <div className='slider--hide-overflow'>
          <div
            className='slider__carousel'
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {news.map((news, index) => (
              <section className='slider' key={index}>
                <div className='slider__sidebar'>
                  <h1 className='slider__sidebar--title'>{news.title}</h1>
                  <hr className='slider__sidebar--line' />
                  <p className='slider__sidebar--summary'>
                    {news.description.length > 100
                      ? `${news.description.substring(0, 100)}...`
                      : news.description}
                  </p>
                  <YellowButton
                    name='Ver más'
                    route={`/noticias/noticia/${news.id}`}
                  />
                </div>
                <div className='slider__image'>
                  {news.cover ? (
                    <img
                      className='slider__image--img'
                      src={news.cover}
                      alt='Imagen de la noticia'
                    />
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </div>
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
