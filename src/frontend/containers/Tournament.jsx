import React, { useEffect } from 'react';
import Articles from '../components/Articles.jsx';
import ButtonContainer from './ButtonContainer.jsx';
import GrayButton from '../components/GrayButton.jsx';
import '../assets/styles/components/Article.scss';
import linkIcon from '../assets/icons/link-icon.svg';
import facebookIcon from '../assets/icons/facebook-icon.svg';
import twitterIcon from '../assets/icons/twitter-icon.svg';

const Tournament = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Torneo';
  }, []);

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

        <h1 class='article--title'>Torneo de Liga TELMEX</h1>

        <div class='article--info'>
          <p>Asociación de Beisbolistas Michoacanos</p>
          <p>•</p>
          <p>Octubre 26, 2021</p>
        </div>

        <hr class='article--line' />

        <p class='article--description'>
          <a className='card--link'>
            https://docs.google.com/document/d/1nBUzVIkWIdFPszrIoaqkcxLeSa-kz1QAqHFxK41E_MA/edit
          </a>
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

        <ButtonContainer>
          <GrayButton
            name='Editar Torneo'
            route='/torneos/torneo/editar-torneo'
          />
        </ButtonContainer>
      </section>

      <section class='more-articles'>
        <h2 class='more-articles--title'>Más Torneos</h2>
        <Articles
          title='Torneo de Liga TELMEX'
          date='Octubre 26, 2021'
          category='Torneo'
        />
        <Articles
          title='Torneo de Liga TELMEX'
          date='Octubre 26, 2021'
          category='Torneo'
        />
      </section>
    </main>
  );
};

export default Tournament;
