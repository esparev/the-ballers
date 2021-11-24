import React, { useEffect } from 'react';
import NewsCard from '../components/Card.jsx';
import ButtonContainer from './ButtonContainer.jsx';
import YellowButton from '../components/YellowButton.jsx';
import '../assets/styles/components/CardsContainer.scss';

const News = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Torneos';
  }, []);

  return (
    <main>
      <div className='cards__container'>
        <h1 className='cards__container--title'>Torneos</h1>
        
        <NewsCard
          title='Torneo de Liga TELMEX'
          date='Octubre 26, 2021'
          category='Torneo'
          link='https://docs.google.com/document/d/1nBUzVIkWIdFPszrIoaqkcxLeSa-kz1QAqHFxK41E_MA/edit'
          route='/torneos/torneo'
        />
        <NewsCard
          title='Torneo de Liga TELMEX'
          date='Octubre 26, 2021'
          category='Torneo'
          link='https://docs.google.com/document/d/1nBUzVIkWIdFPszrIoaqkcxLeSa-kz1QAqHFxK41E_MA/edit'
          route='/torneos/torneo'
        />
        <NewsCard
          title='Torneo de Liga TELMEX'
          date='Octubre 26, 2021'
          category='Torneo'
          link='https://docs.google.com/document/d/1nBUzVIkWIdFPszrIoaqkcxLeSa-kz1QAqHFxK41E_MA/edit'
          route='/torneos/torneo'
        />

        <ButtonContainer>
          <YellowButton name='Nuevo Torneo' route='/torneos/nuevo-torneo' />
        </ButtonContainer>
      </div>
    </main>
  );
};

export default News;
