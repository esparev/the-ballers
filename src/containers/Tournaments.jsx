import React, { useEffect } from 'react';
import { HashRouter, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import moment from 'moment';
import TournamentCard from '@components/Card';
import ButtonContainer from '@containers/ButtonContainer';
import useGetTournaments from '@hooks/useGetTournaments';
import sortByDate from '@functions/sortByDate';
import { envConfig } from '@config';
import '@styles/CardsContainer.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the tournaments page with all its functions
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const Tournaments = () => {
  // Setting moment.js to english
  moment.locale('en');

  // Fetching the necessary data to showcase in the component
  const tournaments = useGetTournaments(envConfig.apiUrl);

  // Sorting the tournaments by most recent date
  sortByDate(tournaments);

  useEffect(() => {
    document.title = 'The Ballers • Tournaments';
    window.scrollTo(0, 0);

    const search = document.getElementById('searchBar');

    /**
     * Shows and filters the tournaments depending on the search request
     * after a search action is being performed in the search bar input
     */
    search.addEventListener('keyup', (e) => {
      // Transforms the search value to lowercase
      const searchString = e.target.value.toLowerCase();

      /**
       * Filtered tournaments based upon the search result value
       * and it will try and find coincidences on the title or the link
       * and see if the search result value is included in any of the
       * properties
       */
      const filteredTournaments = tournaments.filter(
        (tournament) =>
          tournament.title.toLowerCase().includes(searchString) ||
          tournament.link.toLowerCase().includes(searchString)
      );

      if (searchString.length > 0) {
        ReactDOM.render(
          <>
            {filteredTournaments.length > 0 ? (
              <>
                <h1 className='tournaments--title'>Search results</h1>
                {filteredTournaments.map((tournament) => (
                  <HashRouter>
                    <TournamentCard
                      tournament={tournament}
                      key={tournament.slug}
                      title={tournament.title}
                      cover={tournament.cover}
                      date={moment(tournament.createdAt).format('DD MMMM, YYYY')}
                      category='Tournament'
                      description={tournament.description}
                      route={`/torneos/${tournament.slug}`}
                    />
                  </HashRouter>
                ))}
              </>
            ) : (
              <h1 className='tournaments--title'>No matches found</h1>
            )}
          </>,
          document.getElementById('filtered-tournaments')
        );
      } else if (searchString.length === 0) {
        ReactDOM.render(null, document.getElementById('filtered-tournaments'));
      }
    });
  }, [tournaments]);

  return (
    <main>
      <div className='tournaments__body'>
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
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
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

          {localStorage.getItem('id') ? (
            <ButtonContainer>
              <Link
                className='button primary-button'
                style={{ marginRight: 0 }}
                to='/torneos/nuevo-torneo'>
                Create tournament
              </Link>
            </ButtonContainer>
          ) : null}
        </div>

        <div className='filtered-search' id='filtered-tournaments'></div>

        <h1 className='tournaments--title'>Tournaments</h1>

        <div className='tournaments__container'>
          {tournaments.map((tournament) => (
            <TournamentCard
              tournament={tournament}
              key={tournament.slug}
              title={tournament.title}
              cover={tournament.cover}
              date={moment(tournament.createdAt).format('DD MMMM, YYYY')}
              category='Tournament'
              description={tournament.description}
              route={`/torneos/${tournament.slug}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Tournaments;
