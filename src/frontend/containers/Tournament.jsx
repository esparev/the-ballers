import React, { useEffect } from 'react';
import Article from '../components/Article.jsx';
import ButtonContainer from './ButtonContainer.jsx';
import GrayButton from '../components/GrayButton.jsx';
import '../assets/styles/components/Article.scss';
import linkIcon from '../assets/icons/link-icon.svg';
import facebookIcon from '../assets/icons/facebook-icon.svg';
import twitterIcon from '../assets/icons/twitter-icon.svg';

const Tournament = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Torneo';
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

        <h1 className='article--title'>Torneo de Liga TELMEX</h1>

        <div className='article--info'>
          <p>Asociación de Beisbolistas Michoacanos</p>
          <p>•</p>
          <p>Octubre 26, 2021</p>
        </div>

        <hr className='article--line' />

        <p className='article--description'>
          <a className='card--link'>
            https://docs.google.com/document/d/1nBUzVIkWIdFPszrIoaqkcxLeSa-kz1QAqHFxK41E_MA/edit
          </a>
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
        
        {localStorage.getItem('id') ? (
          <ButtonContainer>
            <GrayButton
              name='Editar Torneo'
              route='/torneos/torneo/editar-torneo'
            />
          </ButtonContainer>
        ) : null}
      </section>

      <section className='more-articles'>
        <h2 className='more-articles--title'>Más Torneos</h2>
        <Article
          title='Torneo de Liga TELMEX'
          date='Octubre 26, 2021'
          category='Torneo'
        />
        <Article
          title='Torneo de Liga TELMEX'
          date='Octubre 26, 2021'
          category='Torneo'
        />
      </section>
    </main>
  );
};

export default Tournament;
