import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import moment from 'moment';
import Message from '@components/Message';
import Article from '@components/Article';
import SecondaryButton from '@components/SecondaryButton';
import ButtonContainer from '@containers/ButtonContainer';
import useGetSingleNews from '@hooks/useGetSingleNews';
import useGetNews from '@hooks/useGetNews';
import sortByDate from '@functions/sortByDate';
import urlEncode from '@functions/urlEncode';
import loadComponent from '@functions/loadComponent';
import { envConfig } from '@config';
import '@styles/Article.scss';
import linkIcon from '@icons/link-icon.svg';
import facebookIcon from '@icons/facebook-icon.svg';
import twitterIcon from '@icons/twitter-icon.svg';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the single news page with all its functions
 * stored inside for its full operation
 * @param {*} props
 * @returns JSX code to render to the DOM tree
 */
const SingleNews = (props) => {
  // Assigns the news's id from the URL to the id props
  const { slug } = props.match.params;

  // Setting moment.js to spanish
  moment.locale('es');

  // Fetching the necessary data to showcase in the component
  const news = useGetSingleNews(envConfig.apiUrl, slug);
  let newsCollection = useGetNews(envConfig.apiUrl);

  // Setting the news's id to have data persistency only on local storage
  localStorage.setItem('selected news', news.id);

  // Sorting the news by most recent date
  sortByDate(newsCollection);

  // Slicing the news to not show all of them
  newsCollection = newsCollection.slice(0, 3);

  useEffect(() => {
    document.title = 'BEISMICH • Noticia';
    window.scrollTo(0, 0);
  }, []);

  /**
   * Copies the URL of the page
   * into the user's clipboard
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
              <SecondaryButton
                name='Editar Noticia'
                route={`/noticias/${news.id}/editar-noticia`}
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
              route={`/noticias/${news.id}`}
              onClick={loadComponent}
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
