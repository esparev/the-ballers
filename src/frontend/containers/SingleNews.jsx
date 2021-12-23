import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Cookie from 'js-cookie';
import Article from '../components/Article';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import useGetSingleNews from '../hooks/useGetSingleNews';
import useGetNews from '../hooks/useGetNews';
import { cookieConfig } from '../utils/constants';
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
  // localStorage.setItem('selected news', news.id);
  Cookie.set('selected news', news.id, cookieConfig);

  /**
   * Sorts the array of objects by recent date
   * @param {*} arr - array of objects
   */
  const sortByDate = (arr) => {
    const sorter = (a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    };
    arr.sort(sorter);
  };
  sortByDate(newsCollection);

  newsCollection = newsCollection.slice(0, 3);

  useEffect(() => {
    document.title = 'BEISMICH • Noticia';
    window.scrollTo(0, 0);
  }, []);

  return (
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
              <img className='share-icon' src={linkIcon} alt='Copiar enlace' />
            </a>
          </div>
        </div>

        {/* {localStorage.getItem('id') ? ( */}
        {Cookie.get('id') ? (
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
  );
};

export default SingleNews;
