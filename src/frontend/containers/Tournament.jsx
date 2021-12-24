import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';
import Article from '../components/Article';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import useGetTournament from '../hooks/useGetTournament';
import useGetTournaments from '../hooks/useGetTournaments';
import sortByDate from '../utils/functions/sortByDate';
import { envConfig } from '../utils/config';
import '../assets/styles/components/Article.scss';
import linkIcon from '../assets/icons/link-icon.svg';
import facebookIcon from '../assets/icons/facebook-icon.svg';
import twitterIcon from '../assets/icons/twitter-icon.svg';

const Tournament = (props) => {
  const { id } = props.match.params;

  moment.locale('es');

  const tournament = useGetTournament(envConfig.apiUrl, id);
  let tournaments = useGetTournaments(envConfig.apiUrl);

  localStorage.setItem('selected tournament', tournament.id);

  sortByDate(tournaments);

  tournaments = tournaments.slice(0, 3);

  useEffect(() => {
    document.title = 'BEISMICH • Torneo';
    window.scrollTo(0, 0);
  }, []);

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: tournament.title,
    image: tournament.cover,
    author: tournament.author,
    genre: 'beisbol',
    keywords: 'beisbol torneo michoacan',
    publisher: {
      '@type': 'Organization',
      name: 'BEISMICH',
      url: 'https://www.beismich.netlify.app',
    },
    url: 'https://www.beismich.netlify.app',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://google.com/article',
    },
    datePublished: tournament.createdAt,
    dateCreated: tournament.createdAt,
    description: tournament.link,
    articleBody: tournament.link,
  };

  return (
    <>
      <Helmet>
        <meta property='og:locale' content='es_ES' />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={tournament.title} />
        <meta property='og:description' content={tournament.link} />
        <meta property='og:url' content={window.location} />
        <meta property='og:site_name' content='BEISMICH' />
        <meta property='article:author' content={tournament.author} />
        <meta
          property='article:publisher'
          content='https://www.facebook.com/BEISMICH'
        />
        <meta property='og:image' content={tournament.cover} />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={tournament.title} />
        <meta name='twitter:description' content={tournament.description} />
        <meta name='twitter:domain' content='BEISMICH' />
        <meta name='twitter:image:src' content={tournament.cover} />

        <script type='application/ld+json'>
          {JSON.stringify(articleStructuredData)}
        </script>
      </Helmet>

      <main className='article__container'>
        <section className='article'>
          {tournament.cover ? (
            <div className='article__cover'>
              <img
                className='article__cover--image cover-image'
                src={tournament.cover}
                alt='Imagen del torneo'
              />
            </div>
          ) : null}

          <h1 className='article--title'>{tournament.title}</h1>

          <div className='article--info'>
            <p>{tournament.author}</p>
            <p>•</p>
            <p>
              {moment(tournament.createdAt).format(
                'DD [de] MMMM [de] YYYY, h:mm a'
              )}
            </p>
          </div>

          <hr className='article--line' />

          <p className='article--description'>
            <a
              className='card--link'
              href={tournament.link}
              target='_blank'
              rel='noopener noreferrer'
            >
              {tournament.link}
            </a>
          </p>

          <div className='article__share'>
            <p>Compartir:</p>
            <div className='article__icons'>
              <a href='#'>
                <img
                  className='share-icon'
                  src={facebookIcon}
                  alt='Compartir en Facebook'
                />
              </a>
              <a href='#'>
                <img
                  className='share-icon'
                  src={twitterIcon}
                  alt='Compartir en Twitter'
                />
              </a>
              <a href='#'>
                <img
                  className='share-icon'
                  src={linkIcon}
                  alt='Copiar enlace'
                />
              </a>
            </div>
          </div>

          {localStorage.getItem('id') ? (
            <ButtonContainer>
              <GrayButton
                name='Editar Torneo'
                route={`/torneos/torneo/${tournament.id}/editar-torneo`}
              />
            </ButtonContainer>
          ) : null}
        </section>

        <section className='more-articles'>
          <h2 className='more-articles--title'>Más Torneos</h2>

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
      </main>
    </>
  );
};

export default Tournament;
