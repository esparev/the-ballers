import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Helmet from 'react-helmet';
import Message from '@components/Message';
import Article from '@components/Article';
import SecondaryButton from '@components/Buttons/SecondaryButton';
import ButtonContainer from '@containers/ButtonContainer';
import { getTournament } from '@api/getTournament';
import useGetTournaments from '@hooks/useGetTournaments';
import sortByDate from '@functions/sortByDate';
import urlEncode from '@functions/urlEncode';
import { envConfig } from '@config';
import '@styles/Article.scss';
import linkIcon from '@icons/link-icon.svg';
import facebookIcon from '@icons/facebook-icon.svg';
import twitterIcon from '@icons/twitter-icon.svg';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the tournament page with all its functions
 * stored inside for its full operation
 * @param {*} props
 * @returns JSX code to render to the DOM tree
 */
const Tournament = (props) => {
  // Assigns the tournament's slug from the URL to the slug props
  const { slug } = props.match.params;
  const [tournamentData, setTournamentData] = useState({
    slug: '',
    title: '',
    description: '',
    createdAt: '',
    author: 'JoseMa Esparev',
    cover: '',
  });

  // Fetching the data to showcase in the component
  const loadTournament = async () => {
    try {
      const response = await getTournament(envConfig.apiUrl, slug);
      setTournamentData({
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

  let tournaments = useGetTournaments(envConfig.apiUrl);

  // Sorting the tournaments by most recent date
  sortByDate(tournaments);

  // Slicing the tournaments to not show all of them
  tournaments = tournaments.slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      await loadTournament();
    })();
  }, [slug]);

  useEffect(() => {
    document.title = `${tournamentData.title} • The Ballers`;
  }, [tournamentData]);

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
    headline: tournamentData.title,
    image: tournamentData.cover,
    author: tournamentData.author,
    genre: 'baseball',
    keywords: 'baseball torneo michoacan',
    publisher: {
      '@type': 'Organization',
      name: 'The Ballers',
      url: 'https://esparev-the-ballers.netlify.app',
    },
    url: 'https://esparev-the-ballers.netlify.app',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://google.com/article',
    },
    datePublished: tournamentData.createdAt,
    dateCreated: tournamentData.createdAt,
    description: tournamentData.link,
    articleBody: tournamentData.link,
  };

  return (
    <>
      <div id='message-container'></div>

      <main className='article__container'>
        <section className='article'>
          {tournamentData.cover ? (
            <div className='article__cover'>
              <img
                className='article__cover--image cover-image'
                src={tournamentData.cover}
                alt='Imagen del torneo'
              />
            </div>
          ) : null}

          <h1 className='article--title'>{tournamentData.title}</h1>

          <div className='article__info'>
            <p className='article__info--author'>{tournamentData.author}</p>
            <p>•</p>
            <p>{moment(tournamentData.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
          </div>

          <hr className='article--line' />

          <p className='article--description'>{tournamentData.description}</p>

          <div className='article__share'>
            <p>Compartir:</p>
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
              <SecondaryButton
                name='Edit tournament'
                route={`/edit-tournament/${tournamentData.slug}`}
              />
            </ButtonContainer>
          ) : null}
        </section>

        <section className='more-articles'>
          <h2 className='more-articles--title'>More tournaments</h2>
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
      </main>

      <Helmet>
        {/* Facebook og tags */}
        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='article' />
        <meta property='og:title' content={tournamentData.title} />
        <meta property='og:description' content={tournamentData.link} />
        <meta property='og:url' content={window.location} />
        <meta property='og:site_name' content='The Ballers' />
        <meta property='article:author' content={tournamentData.author} />
        <meta property='article:publisher' content='https://esparev.com' />
        <meta property='og:image' content={tournamentData.cover} />
        {/* Twitter cards */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={tournamentData.title} />
        <meta name='twitter:description' content={tournamentData.description} />
        <meta name='twitter:domain' content='The Ballers' />
        <meta name='twitter:image:src' content={tournamentData.cover} />
        {/* SEO */}
        <script type='application/ld+json'>{JSON.stringify(articleStructuredData)}</script>
      </Helmet>
    </>
  );
};

export default Tournament;
