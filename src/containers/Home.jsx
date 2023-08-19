import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import Card from '@components/Card';
import CardSkeleton from '@components/CardSkeleton';
import Entity from '@components/Entity';
import Article from '@components/Article';
import ArticleSkeleton from '@components/ArticleSkeleton';
import PrimaryButton from '@components/Buttons/PrimaryButton';
import EntityContainer from '@containers/EntityContainer';
import useGetNews from '@hooks/useGetNews';
import useGetClubs from '@hooks/useGetClubs';
import useGetTournaments from '@hooks/useGetTournaments';
import sortByDate from '@functions/sortByDate';
import { envConfig } from '@config';
import '@mainStyles/App.scss';
import '@styles/Home.scss';
// ---------------------------------------- END OF IMPORTS

// Delay time between news for the slideshow
const delay = 10000;

/**
 * Creates the home page with all its functions
 * stored inside for its full operation
 */
const Home = () => {
  // Setting moment.js to english
  moment.locale('en');

  // Fetching the data to showcase in the component
  let clubs = useGetClubs(envConfig.apiUrl);
  let news = useGetNews(envConfig.apiUrl);
  let tournaments = useGetTournaments(envConfig.apiUrl);

  // Sorting news and tournaments by most recent date
  sortByDate(news);
  sortByDate(tournaments);

  // Slicing clubs, news and tournaments to not show all of them
  clubs = clubs.slice(0, 6);
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
    document.title = 'Home • The Ballers';

    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setIndex((prevIndex) => (prevIndex === news.length - 1 ? 0 : prevIndex + 1)),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <>
      {news.length > 0 ? (
        <>
          <main className='slider__container'>
            <div className='slider--hide-overflow'>
              <div className='slider__carousel' style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
                {news.map((news, index) => (
                  <section className='slider' key={index}>
                    <div className='slider__sidebar'>
                      <h1 className='slider__sidebar--title'>{news.title}</h1>
                      <hr className='slider__sidebar--line' />
                      <p className='slider__sidebar--summary'>{news.description}</p>
                      <PrimaryButton name='See more' route={`/news/${news.slug}`} />
                    </div>
                    <div className='slider__image'>
                      {news.cover ? <img className='slider__image--img' src={news.cover} alt='News cover' /> : null}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </main>

          <section className='entities'>
            <h2 className='leagues--title'>Meet our clubs</h2>
            <EntityContainer>
              {clubs.map((league) => (
                <Entity
                  league={league}
                  key={league.slug}
                  name={league.name}
                  logo={league.logo}
                  route={`/club/${league.slug}`}
                />
              ))}
            </EntityContainer>
          </section>

          <section className='news-tournaments'>
            <section className='news'>
              <h2 className='news--title'>News</h2>
              <div className='news__container'>
                {news.map((news) => (
                  <Card
                    news={news}
                    key={news.slug}
                    title={news.title}
                    cover={news.cover}
                    date={moment(news.createdAt).format('DD MMMM, YYYY')}
                    category='News'
                    description={news.description}
                    route={`/news/${news.slug}`}
                  />
                ))}
              </div>
            </section>

            <section className='tournaments'>
              <h2 className='tournaments--title'>Tournaments</h2>
              {tournaments.map((tournament) => (
                <Article
                  tournament={tournament}
                  key={tournament.slug}
                  title={tournament.title}
                  cover={tournament.cover}
                  date={moment(tournament.createdAt).format('DD MMMM, YYYY')}
                  category='Tournament'
                  route={`/tournament/${tournament.slug}`}
                />
              ))}
            </section>
          </section>
        </>
      ) : (
        <>
          <section className='news-tournaments'>
            <section className='news'>
              <h2 className='news--title'>News</h2>
              <div className='news__container'>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            </section>

            <section className='tournaments'>
              <h2 className='tournaments--title'>Tournaments</h2>
              <ArticleSkeleton />
              <ArticleSkeleton />
              <ArticleSkeleton />
            </section>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
