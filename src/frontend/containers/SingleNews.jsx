import React from 'react';
import Articles from '../components/Articles.jsx';
import '../assets/styles/components/Article.scss';
import linkIcon from '../assets/icons/link-icon.svg';
import facebookIcon from '../assets/icons/facebook-icon.svg';
import twitterIcon from '../assets/icons/twitter-icon.svg';

const SingleNews = () => {
  return (
    <main className='article__container'>
      <section class='article'>
        <div class='article__cover'>
          <img
            class='article__cover--image cover-image'
            src='https://www.collinsdictionary.com/images/full/baseball_557405302_1000.jpg'
            alt=''
          />
        </div>
        <h1 class='article--title'>
          BEISMICH manda liga de Morelia al mundial
        </h1>
        <div class='article--info'>
          <p>Asociación de Beisbolistas Michoacanos</p>
          <p>•</p>
          <p>Octubre 26, 2021</p>
        </div>

        <hr class='article--line' />

        <p class='article--description'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies
          quis egestas aliquet leo amet, eget. Sit vitae amet, sollicitudin ac
          placerat. Pellentesque in enim fusce enim sit mi turpis sed. Sagittis,
          ac eget enim duis venenatis netus elementum nisi elit. Ac, vel viverra
          sed tincidunt et ipsum interdum in in. Sed cras sagittis nec sed nam.
          Nisl interdum sit tincidunt fringilla facilisis.
        </p>
        <div class='article__share'>
          <p>Compartir:</p>
          <div class='article__icons'>
            <a href='#'>
              <img
                class='share-icon'
                src={facebookIcon}
                alt='Compartir en Facebook'
              />
            </a>
            <a href='#'>
              <img
                class='share-icon'
                src={twitterIcon}
                alt='Compartir en Twitter'
              />
            </a>
            <a href='#'>
              <img class='share-icon' src={linkIcon} alt='Copiar enlace' />
            </a>
          </div>
        </div>

        <div class='button-container'>
          <a class='button gray-button' href='./edit-news.html'>
            Editar Noticia
          </a>
        </div>
      </section>

      <section class='more-articles'>
        <h2 class='more-articles--title'>Más Noticias</h2>
        <Articles
          title='BEISMICH manda liga de Morelia al mundial'
          date='Octubre 26, 2021'
          category='Noticia'
        />
        <Articles
          title='BEISMICH manda liga de Morelia al mundial'
          date='Octubre 26, 2021'
          category='Noticia'
        />
      </section>
    </main>
  );
};

export default SingleNews;
