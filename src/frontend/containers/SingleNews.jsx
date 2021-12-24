import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';
import Article from '../components/Article';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import useGetSingleNews from '../hooks/useGetSingleNews';
import useGetNews from '../hooks/useGetNews';
import sortByDate from '../utils/functions/sortByDate';
import { envConfig } from '../utils/config';
import '../assets/styles/components/Article.scss';
import linkIcon from '../assets/icons/link-icon.svg';
import facebookIcon from '../assets/icons/facebook-icon.svg';
import twitterIcon from '../assets/icons/twitter-icon.svg';

const SingleNews = (props) => {
  const { id } = props.match.params;

  moment.locale('es');
  
  const news = useGetSingleNews(envConfig.apiUrl, id);
  let newsCollection = useGetNews(envConfig.apiUrl);

  localStorage.setItem('selected news', news.id);

  sortByDate(newsCollection);

  newsCollection = newsCollection.slice(0, 3);

  useEffect(() => {
    document.title = 'BEISMICH • Noticia';
    window.scrollTo(0, 0);
  }, []);

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: news.title,
    image: news.cover,
    author: news.author,
    genre: 'beisbol',
    keywords: 'beisbol torneo michoacan',
    publisher: {
      '@type': 'Organization',
      url: 'https://www.beismich.netlify.app',
      name: 'BEISMICH',
    },
    url: 'https://www.beismich.netlify.app',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://google.com/article',
    },
    datePublished: news.createdAt,
    dateCreated: news.createdAt,
    description: news.description,
    articleBody: news.description,
  };

  return (
    <>
      <Helmet>
        <meta property='og:locale' content='es_ES' />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={news.title} />
        <meta property='og:description' content={news.description} />
        <meta property='og:url' content={window.location} />
        <meta property='og:site_name' content='BEISMICH' />
        <meta property='article:author' content={news.author} />
        <meta
          property='article:publisher'
          content='https://www.facebook.com/BEISMICH'
        />
        <meta property='og:image' content={news.cover} />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={news.title} />
        <meta name='twitter:description' content={news.description} />
        <meta name='twitter:domain' content='BEISMICH' />
        <meta name='twitter:image:src' content={news.cover} />

        <script type='application/ld+json'>
          {JSON.stringify(articleStructuredData)}
        </script>
      </Helmet>

      <main className='article__container'>
        <section className='article'>
          <div className='article__cover'>
            <img
              className='article__cover--image cover-image'
              src={news.cover}
              alt='Imagen de la noticia'
            />
          </div>

          <h1 className='article--title'>{news.title}</h1>

          <div className='article--info'>
            <p>{news.author}</p>
            <p>•</p>
            <p>
              {moment(news.createdAt).format('DD [de] MMMM [de] YYYY, h:mm a')}
            </p>
          </div>

          <hr className='article--line' />

          <p className='article--description'>{news.description}</p>

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
                name='Editar Noticia'
                route={`/noticias/noticia/${news.id}/editar-noticia`}
              />
            </ButtonContainer>
          ) : null}
        </section>

        <section className='more-articles'>
          <h2 className='more-articles--title'>Más Noticias</h2>

          {newsCollection.map((news) => (
            <Article
              news={news}
              key={news.id}
              title={news.title}
              cover={news.cover}
              date={moment(news.createdAt).format('DD MMMM, YYYY')}
              category='Noticia'
              route={`/noticias/noticia/${news.id}`}
            />
          ))}
        </section>
      </main>
    </>
  );
};

export default SingleNews;
