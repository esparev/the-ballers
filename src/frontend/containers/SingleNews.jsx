import React, { useEffect } from 'react';
import Article from '../components/Article.jsx';
import ButtonContainer from './ButtonContainer.jsx';
import GrayButton from '../components/GrayButton.jsx';
import '../assets/styles/components/Article.scss';
import linkIcon from '../assets/icons/link-icon.svg';
import facebookIcon from '../assets/icons/facebook-icon.svg';
import twitterIcon from '../assets/icons/twitter-icon.svg';

const SingleNews = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Noticia';
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

        <h1 className='article--title'>
          BEISMICH manda liga de Morelia al mundial
        </h1>

        <div className='article--info'>
          <p>Asociación de Beisbolistas Michoacanos</p>
          <p>•</p>
          <p>Octubre 26, 2021</p>
        </div>

        <hr className='article--line' />

        <p className='article--description'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies
          quis egestas aliquet leo amet, eget. Sit vitae amet, sollicitudin ac
          placerat. Pellentesque in enim fusce enim sit mi turpis sed. Sagittis,
          ac eget enim duis venenatis netus elementum nisi elit. Ac, vel viverra
          sed tincidunt et ipsum interdum in in. Sed cras sagittis nec sed nam.
          Nisl interdum sit tincidunt fringilla facilisis.
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
              <img className='share-icon' src={linkIcon} alt='Copiar enlace' />
            </a>
          </div>
        </div>

        <ButtonContainer>
          <GrayButton
            name='Editar Noticia'
            route='/noticias/noticia/editar-noticia'
          />
        </ButtonContainer>
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
