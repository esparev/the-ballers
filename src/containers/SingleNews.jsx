import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import moment from 'moment';
import Message from '@components/Message';
import Article from '@components/Article';
import SecondaryButton from '@components/SecondaryButton';
import ButtonContainer from '@containers/ButtonContainer';
import { getSingleNews } from '../api/getSingleNews';
import useGetNews from '@hooks/useGetNews';
import sortByDate from '@functions/sortByDate';
import urlEncode from '@functions/urlEncode';
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
  // Assigns the tournament's slug from the URL to the slug props
  const { slug } = props.match.params;
  const [newsData, setNewsData] = useState({
    slug: '',
    title: '',
    description: '',
    createdAt: '',
    author: 'JoseMa Esparev',
    cover: '',
  });

  // Fetching the data to showcase in the component
  const loadNews = async () => {
    try {
      const response = await getSingleNews(envConfig.apiUrl, slug);
      setNewsData({
        slug: response.slug,
        title: response.title,
        description: response.description,
        createdAt: response.createdAt,
        author: response.author,
        cover: response.cover,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Setting moment.js to english
  moment.locale('en');

  // Slicing the news to not show all of them
  let newsCollection = useGetNews(envConfig.apiUrl).slice(0, 3);

  // Sorting the news by most recent date
  sortByDate(newsCollection);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      await loadNews();
    })();
  }, [slug]);

  useEffect(() => {
    document.title = `${newsData.title} • The Ballers`;
  }, [newsData]);

  /**
   * Copies the URL of the page
   * into the user's clipboard
   */
  const copyLink = () => {
    navigator.clipboard.writeText(window.location);

    ReactDOM.render(
      <Message message='Link copied to clipboard' messageStatus='success' />,
      document.getElementById('message-container')
    );
  };

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: newsData.title,
    image: newsData.cover,
    author: newsData.author,
    genre: 'baseball',
    keywords: 'baseball tournament',
    publisher: {
      '@type': 'Organization',
      url: 'https://esparev-the-ballers.netlify.app',
      name: 'The ballers',
    },
    url: 'https://esparev-the-ballers.netlify.app',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://google.com/article',
    },
    datePublished: newsData.createdAt,
    dateCreated: newsData.createdAt,
    description: newsData.description,
    articleBody: newsData.description,
  };

  return (
    <>
      <div id='message-container'></div>

      <main className='article__container'>
        <section className='article'>
          {newsData.cover ? (
            <div className='article__cover'>
              <img
                className='article__cover--image cover-image'
                src={newsData.cover}
                alt='News cover'
              />
            </div>
          ) : null}

          <h1 className='article--title'>{newsData.title}</h1>

          <div className='article__info'>
            <p className='article__info--author'>{newsData.author}</p>
            <p>•</p>
            <p>{moment(newsData.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
          </div>

          <hr className='article--line' />

          <p className='article--description'>{newsData.description}</p>

          <div className='article__share'>
            <p>Share on</p>
            <div className='article__icons'>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${urlEncode(
                  window.location.toString()
                )}`}
                target='_blank'
                rel='noopener noreferrer'>
                <img
                  className='share-icon'
                  src={facebookIcon}
                  title='Share on Facebook'
                  alt='Share on Facebook'
                />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fbeismich.netlify.app%2F&ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E&text=%C2%A1Mira+esta+noticia%21&url=${urlEncode(
                  window.location.toString()
                )}`}
                target='_blank'
                rel='noopener noreferrer'>
                <img
                  className='share-icon'
                  src={twitterIcon}
                  title='Share on Twitter'
                  alt='Share on Twitter'
                />
              </a>
              <a onClick={copyLink}>
                <img className='share-icon' src={linkIcon} title='Copy link' alt='Copy link' />
              </a>
            </div>
          </div>

          {localStorage.getItem('slug') ? (
            <ButtonContainer>
              <SecondaryButton name='Edit news' route={`/edit-news/${newsData.slug}`} />
            </ButtonContainer>
          ) : null}
        </section>

        <section className='more-articles'>
          <h2 className='more-articles--title'>More news</h2>
          {newsCollection.map((news) => (
            <Article
              news={news}
              key={news.slug}
              title={news.title}
              cover={news.cover}
              date={moment(news.createdAt).format('MMMM Do YYYY')}
              category='News'
              route={`/news/${news.slug}`}
            />
          ))}
        </section>
      </main>

      <Helmet>
        {/* Facebook og tags */}
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={newsData.title} />
        <meta property='og:description' content={newsData.description} />
        <meta property='og:url' content={window.location} />
        <meta property='og:site_name' content='The Ballers' />
        <meta property='article:author' content={newsData.author} />
        <meta property='article:publisher' content='https://esparev.com' />
        <meta property='og:image' content={newsData.cover} />
        {/* Twitter cards */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={newsData.title} />
        <meta name='twitter:description' content={newsData.description} />
        <meta name='twitter:domain' content='The Ballers' />
        <meta name='twitter:image:src' content={newsData.cover} />
        {/* SEO */}
        <script type='application/ld+json'>{JSON.stringify(articleStructuredData)}</script>
      </Helmet>
    </>
  );
};

export default SingleNews;
