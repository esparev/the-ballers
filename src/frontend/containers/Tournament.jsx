import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Article from '../components/Article';
import ButtonContainer from './ButtonContainer';
import GrayButton from '../components/GrayButton';
import useGetTournaments from '../hooks/useGetTournaments';
import sortByDate from '../functions/sortByDate';
import '../assets/styles/components/Article.scss';
import linkIcon from '../assets/icons/link-icon.svg';
import facebookIcon from '../assets/icons/facebook-icon.svg';
import twitterIcon from '../assets/icons/twitter-icon.svg';

const API = 'https://beismich.herokuapp.com/api/v1/torneos';

const Tournament = (props) => {
  const { id } = props.match.params;

  moment.locale('es');
  const tournament = useGetTournaments(`${API}/${id}`);
  const tournaments = useGetTournaments(API);
  localStorage.setItem('selected tournament', tournament.id);
  sortByDate(tournaments);
  tournaments.slice(0, 3);

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
            src={tournament.cover}
            alt='Imagen del torneo'
          />
        </div>

        <h1 className='article--title'>{tournament.title}</h1>

        <div className='article--info'>
          <p>{tournament.author}</p>
          <p>•</p>
          <p>
            {moment(tournament.createdAt).format(
              'DD [de] MMMM [de] YYYY, h:mm a'
            )}
          </p>
        </div>

        <hr className='article--line' />

        <p className='article--description'>
          <a className='card--link'>{tournament.link}</a>
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
              route={`/torneos/torneo/${tournament.id}/editar-torneo`}
            />
          </ButtonContainer>
        ) : null}
      </section>

      <section className='more-articles'>
        <h2 className='more-articles--title'>Más Torneos</h2>

        {tournaments.map((tournament) => (
          <Article
            tournament={tournament}
            key={tournament.id}
            title={tournament.title}
            cover={tournament.cover}
            date={moment(tournament.createdAt).format('DD MMMM, YYYY')}
            category='Torneo'
            route={`/torneos/torneo/${tournament.id}`}
          />
        ))}
      </section>
    </main>
  );
};

export default Tournament;
