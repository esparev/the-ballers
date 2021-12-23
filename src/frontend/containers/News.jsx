import React, { useEffect } from 'react';
import moment from 'moment';
import Cookie from 'js-cookie';
import NewsCard from '../components/Card';
import ButtonContainer from './ButtonContainer';
import YellowButton from '../components/YellowButton';
import useGetNews from '../hooks/useGetNews';
import { envConfig } from '../utils/config';
import '../assets/styles/components/CardsContainer.scss';

const News = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Noticias';
    window.scrollTo(0, 0);
  }, []);

  moment.locale('es');
  const news = useGetNews(envConfig.apiUrl);

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
  sortByDate(news);

  return (
    <main>
      <div className='cards__container'>
        <h1 className='cards__container--title'>Noticias</h1>

        {news.map((news) => (
          <NewsCard
            news={news}
            key={news.id}
            title={news.title}
            cover={news.cover}
            date={moment(news.createdAt).format('DD MMMM, YYYY')}
            category='Noticia'
            description={
              news.description.length > 255
                ? `${news.description.substring(0, 255)}...`
                : news.description
            }
            route={`/noticias/noticia/${news.id}`}
          />
        ))}

        {/* {localStorage.getItem('id') ? ( */}
        {Cookie.get('id') ? (
          <ButtonContainer>
            <YellowButton
              name='Nueva Noticia'
              route='/noticias/nueva-noticia'
            />
          </ButtonContainer>
        ) : null}
      </div>
    </main>
  );
};

export default News;
