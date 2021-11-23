import React, { useEffect } from 'react';
import NewsCard from '../components/Card.jsx';
import '../assets/styles/components/CardsContainer.scss';

const News = (props) => {
  const { title } = props;

  useEffect(() => {
    document.title = `BEISMICH • ${title}s`;
  }, []);

  return (
    <main>
      <div className='cards__container'>
        <h1 className='cards__container--title'>{title}s</h1>
        <NewsCard
          title='Torneo de Liga TELMEX'
          date='Octubre 26, 2021'
          category={title}
          link='https://docs.google.com/document/d/1nBUzVIkWIdFPszrIoaqkcxLeSa-kz1QAqHFxK41E_MA/edit'
        />
        <NewsCard
          title='Torneo de Liga TELMEX'
          date='Octubre 26, 2021'
          category={title}
          link='https://docs.google.com/document/d/1nBUzVIkWIdFPszrIoaqkcxLeSa-kz1QAqHFxK41E_MA/edit'
        />
        <NewsCard
          title='Torneo de Liga TELMEX'
          date='Octubre 26, 2021'
          category={title}
          link='https://docs.google.com/document/d/1nBUzVIkWIdFPszrIoaqkcxLeSa-kz1QAqHFxK41E_MA/edit'
        />
        <div className='button-container'>
          <button
            className='button yellow-button'
            onClick="location.href='./create-news.html'"
          >
            Nuevo {title}
          </button>
        </div>
      </div>
    </main>
  );
};

export default News;
