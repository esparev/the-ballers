import React, { useEffect } from 'react';
import { HashRouter, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import moment from 'moment';
import NewsCard from '@components/Card';
import ButtonContainer from '@containers/ButtonContainer';
import ServerError from '@containers/ServerError';
import useGetNews from '@hooks/useGetNews';
import sortByDate from '@functions/sortByDate';
import { envConfig } from '@config';
import '@styles/CardsContainer.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the news page with all its functions
 * stored inside for its full operation
 */
const News = () => {
  // Setting moment.js to english
  moment.locale('en');

  // Fetching the necessary data to showcase in the component
  const news = useGetNews(envConfig.apiUrl);

  // Sorting the news by most recent date
  sortByDate(news);

  useEffect(() => {
    document.title = 'News • The Ballers';
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
                <h1 className='news--title'>Search results</h1>
                {filteredNews.map((news) => (
                  <HashRouter>
                    <NewsCard
                      news={news}
                      key={news.slug}
                      title={news.title}
                      cover={news.cover}
                      date={moment(news.createdAt).format('MMMM Do YYYY')}
                      category='News'
                      description={news.description}
                      route={`/news/${news.slug}`}
                    />
                  </HashRouter>
                ))}
              </>
            ) : (
              <h1 className='news--title'>No matches found</h1>
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
      <div className='news__body'>
        <div className='tools'>
          <div className='search-bar'>
            <svg
              className='search-bar--icon'
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M26.6667 26.6667L21.2663 21.2663M21.2663 21.2663C22.9553 19.5773 24 17.244 24 14.6667C24 9.51202 19.8213 5.33334 14.6667 5.33334C9.512 5.33334 5.33333 9.51202 5.33333 14.6667C5.33333 19.8213 9.512 24 14.6667 24C17.244 24 19.5773 22.9553 21.2663 21.2663Z'
                stroke='#9F9F9F'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <input
              className='search-bar--input'
              type='search'
              name='searchBar'
              id='searchBar'
              placeholder='Search by title, description'
            />
          </div>

          {localStorage.getItem('slug') ? (
            <ButtonContainer>
              <Link className='button primary-button' style={{ marginRight: 0 }} to='/new-news'>
                Create news
              </Link>
            </ButtonContainer>
          ) : null}
        </div>
        {news.length > 0 ? (
          <>
            <div className='filtered-search' id='filtered-news'></div>

            <h1 className='news--title'>News</h1>
            <div className='news__container'>
              {news.map((news) => (
                <NewsCard
                  news={news}
                  key={news.slug}
                  title={news.title}
                  cover={news.cover}
                  date={moment(news.createdAt).format('MMMM Do YYYY')}
                  category='News'
                  description={news.description}
                  route={`/news/${news.slug}`}
                />
              ))}
            </div>
          </>
        ) : (
          <ServerError />
        )}
      </div>
    </main>
  );
};

export default News;
