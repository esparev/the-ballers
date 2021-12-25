import React, { useEffect } from 'react';
import { HashRouter, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import moment from 'moment';
import NewsCard from '../components/Card';
import ButtonContainer from './ButtonContainer';
import useGetNews from '../hooks/useGetNews';
import sortByDate from '../utils/functions/sortByDate';
import { envConfig } from '../utils/config';
import '../assets/styles/components/CardsContainer.scss';

const News = () => {
  moment.locale('es');

  const news = useGetNews(envConfig.apiUrl);

  sortByDate(news);

  useEffect(() => {
    document.title = 'BEISMICH • Noticias';
    window.scrollTo(0, 0);

    const search = document.getElementById('searchBar');

    search.addEventListener('keyup', (e) => {
      const searchString = e.target.value.toLowerCase();

      const filteredNews = news.filter(
        (news) =>
          news.title.toLowerCase().includes(searchString) ||
          news.description.toLowerCase().includes(searchString)
      );

      if (searchString.length > 0) {
        ReactDOM.render(
          <>
            {filteredNews.length > 0 ? (
              <>
                <h1 className='cards__container--title'>
                  Noticias Encontradas
                </h1>
                {filteredNews.map((news) => (
                  <HashRouter>
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
                  </HashRouter>
                ))}
              </>
            ) : (
              <h1 className='cards__container--title'>
                No se encontraron coincidencias
              </h1>
            )}
          </>,
          document.getElementById('filtered-news')
        );
      } else if (searchString.length === 0) {
        ReactDOM.render(null, document.getElementById('filtered-news'));
      }
    });
  }, [news]);

  return (
    <main>
      <div className='cards__container'>
        <div className='cards--bar'>
          <input
            className='search-bar'
            type='search'
            name='searchBar'
            id='searchBar'
            placeholder='Buscar una noticia'
          />

          {localStorage.getItem('id') ? (
            <ButtonContainer>
              <Link
                className='button yellow-button'
                to='/noticias/nueva-noticia'
                style={{ marginRight: 0 }}
              >
                Nueva Noticia
              </Link>
            </ButtonContainer>
          ) : null}
        </div>

        <div className='filtered-search' id='filtered-news'></div>

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
      </div>
    </main>
  );
};

export default News;
