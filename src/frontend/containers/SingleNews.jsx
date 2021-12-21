import React, { useEffect } from 'react';
import Article from '../components/Article';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import useGetNews from '../hooks/useGetNews';
import moment from 'moment';
import '../assets/styles/components/Article.scss';
import linkIcon from '../assets/icons/link-icon.svg';
import facebookIcon from '../assets/icons/facebook-icon.svg';
import twitterIcon from '../assets/icons/twitter-icon.svg';

const API = 'https://beismich.herokuapp.com/api/v1/noticias';

const SingleNews = (props) => {
  const { id } = props.match.params;
  localStorage.setItem('selected news', id);

  moment.locale('es');
  const news = useGetNews(`${API}/${localStorage.getItem('selected news')}`);

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
            src='https://www.collinsdictionary.com/images/full/baseball_557405302_1000.jpg'
            alt=''
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

        {localStorage.getItem('id') ? (
          <ButtonContainer>
            <GrayButton
              name='Editar Noticia'
              route='/noticias/noticia/editar-noticia'
            />
          </ButtonContainer>
        ) : null}
      </section>

      <section className='more-articles'>
        <h2 className='more-articles--title'>Más Noticias</h2>
        <Article
          title='BEISMICH manda liga de Morelia al mundial'
          date='Octubre 26, 2021'
          category='Noticia'
        />
        <Article
          title='BEISMICH manda liga de Morelia al mundial'
          date='Octubre 26, 2021'
          category='Noticia'
        />
      </section>
    </main>
  );
};

export default SingleNews;
