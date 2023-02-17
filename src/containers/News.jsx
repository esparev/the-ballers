import React, { useEffect } from 'react';
import { HashRouter, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import moment from 'moment';
import NewsCard from '@components/Card';
import ButtonContainer from '@containers/ButtonContainer';
import useGetNews from '@hooks/useGetNews';
import sortByDate from '@functions/sortByDate';
import { envConfig } from '@config';
import '@styles/CardsContainer.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the news page with all its functions
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const News = () => {
  // Setting moment.js to spanish
  moment.locale('es');

  // Fetching the necessary data to showcase in the component
  const news = useGetNews(envConfig.apiUrl);

  // Sorting the news by most recent date
  sortByDate(news);

  useEffect(() => {
    document.title = 'BEISMICH • Noticias';
    window.scrollTo(0, 0);

    const search = document.getElementById('searchBar');

    /**
     * Shows and filters the news depending on the search request
     * after a search action is being performed in the search bar input
     */
    search.addEventListener('keyup', (e) => {
      // Transforms the search value to lowercase
      const searchString = e.target.value.toLowerCase();

      /**
       * Filtered news based upon the search result value
       * and it will try and find coincidences on the title or the description
       * and see if the search result value is included in any of the properties
       */
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
                      route={`/noticias/${news.id}`}
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
                className='button primary-button'
                style={{ marginRight: 0 }}
                to='/noticias/nueva-noticia'
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
            route={`/noticias/${news.id}`}
          />
        ))}
      </div>
    </main>
  );
};

export default News;
