import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Message from '../components/Message';
import Helmet from 'react-helmet';
import Article from '../components/Article';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import useGetSingleNews from '../hooks/useGetSingleNews';
import useGetNews from '../hooks/useGetNews';
import sortByDate from '../utils/functions/sortByDate';
import urlEncode from '../utils/functions/urlEncode';
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

  const loadNews = () => {
    window.location.reload();
  };

  const loadPage = (location) => {
    window.location.href = location;
    setTimeout(window.location.reload(), 500);
  };

  const handleLoad = () => {
    loadPage(`/#/noticias/noticia/${news.id}/editar-noticia`);
  };

  useEffect(() => {
    document.title = 'BEISMICH • Noticia';
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
      <div id='message-container'></div>

      <main className='article__container'>
        <section className='article'>
          {news.cover ? (
            <div className='article__cover'>
              <img
                className='article__cover--image cover-image'
                src={news.cover}
                alt='Imagen de la noticia'
              />
            </div>
          ) : null}

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
              {/* <GrayButton
                name='Editar Noticia'
                route={`/noticias/noticia/${news.id}/editar-noticia`}
              /> */}
              <button className='button gray-button' onClick={handleLoad}>
                Editar Noticia
              </button>
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
              onClick={loadNews}
            />
          ))}
        </section>
      </main>

      <Helmet>
        {/* Facebook og tags */}
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
        {/* Twitter cards */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={news.title} />
        <meta name='twitter:description' content={news.description} />
        <meta name='twitter:domain' content='BEISMICH' />
        <meta name='twitter:image:src' content={news.cover} />
        {/* SEO */}
        <script type='application/ld+json'>
          {JSON.stringify(articleStructuredData)}
        </script>
      </Helmet>
    </>
  );
};

export default SingleNews;
