import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Message from '../components/Message';
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

  /**
   * Copies the URL of the page into the user's
   * clipboard
   */
  const copyLink = () => {
    navigator.clipboard.writeText(window.location);

    ReactDOM.render(
      <Message message='Enlace copiado' messageStatus='success' />,
      document.getElementById('message-container')
    );
  };

  /**
   * Encodes the necessary characters to
   * parse it in a url
   * @param {string} str
   * @returns
   */
  const urlEncode = (str) => {
    return str
      .replaceAll('#', '%23')
      .replaceAll('/', '%2F')
      .replaceAll(':', '%3A');
  };

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
      <div id='message-container'></div>

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
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${urlEncode(
                  window.location.toString()
                )}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  className='share-icon'
                  src={facebookIcon}
                  alt='Compartir en Facebook'
                />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fbeismich.netlify.app%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&text=%C2%A1Mira+esta+noticia%21&url=${urlEncode(
                  window.location.toString()
                )}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <img
                  className='share-icon'
                  src={twitterIcon}
                  alt='Compartir en Twitter'
                />
              </a>
              <a onClick={copyLink}>
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

      <Helmet>
        {/* Facebook og tags */}
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
        {/* Twitter cards */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={tournament.title} />
        <meta name='twitter:description' content={tournament.description} />
        <meta name='twitter:domain' content='BEISMICH' />
        <meta name='twitter:image:src' content={tournament.cover} />
        {/* SEO */}
        <script type='application/ld+json'>
          {JSON.stringify(articleStructuredData)}
        </script>
      </Helmet>
    </>
  );
};

export default Tournament;
