import React, { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import moment from 'moment';
import TournamentCard from '../components/Card';
import ButtonContainer from './ButtonContainer';
import useGetTournaments from '../hooks/useGetTournaments';
import sortByDate from '../utils/functions/sortByDate';
import loadPage from '../utils/functions/loadPage';
import { envConfig } from '../utils/config';
import '../assets/styles/components/CardsContainer.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the tournaments page with all its functions
 * stored inside for its full operation
 * @returns JSX code to render to the DOM tree
 */
const Tournaments = () => {
  // Setting moment.js to spanish
  moment.locale('es');

  // Fetching the necessary data to showcase in the component
  const tournaments = useGetTournaments(envConfig.apiUrl);

  // Sorting the tournaments by most recent date
  sortByDate(tournaments);

  const handleLoad = () => {
    loadPage(`/#/torneos/nuevo-torneo`);
  };

  useEffect(() => {
    document.title = 'BEISMICH • Torneos';
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
            {/* There were coincidences */}
            {filteredTournaments.length > 0 ? (
              <>
                <h1 className='cards__container--title'>Torneos Encontrados</h1>
                {filteredTournaments.map((tournament) => (
                  <HashRouter>
                    <TournamentCard
                      tournament={tournament}
                      key={tournament.id}
                      title={tournament.title}
                      cover={tournament.cover}
                      date={moment(tournament.createdAt).format(
                        'DD MMMM, YYYY'
                      )}
                      category='Torneo'
                      link={
                        tournament.link.length > 255
                          ? `${tournament.link.substring(0, 255)}...`
                          : tournament.link
                      }
                      route={`/torneos/torneo/${tournament.id}`}
                    />
                  </HashRouter>
                ))}
              </>
            ) : (
              {/* There were no coincidences */}
              <h1 className='cards__container--title'>
                No se encontraron coincidencias
              </h1>
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
      <div className='cards__container'>
        <div className='cards--bar'>
          <input
            className='search-bar'
            type='search'
            name='searchBar'
            id='searchBar'
            placeholder='Buscar un torneo'
          />

          {localStorage.getItem('id') ? (
            <ButtonContainer>
              <button
                className='button yellow-button'
                onClick={handleLoad}
                style={{ marginRight: 0 }}
              >
                Nuevo Torneo
              </button>
            </ButtonContainer>
          ) : null}
        </div>

        <div className='filtered-search' id='filtered-tournaments'></div>

        <h1 className='cards__container--title'>Torneos</h1>

        {tournaments.map((tournament) => (
          <TournamentCard
            tournament={tournament}
            key={tournament.id}
            title={tournament.title}
            cover={tournament.cover}
            date={moment(tournament.createdAt).format('DD MMMM, YYYY')}
            category='Torneo'
            link={
              tournament.link.length > 255
                ? `${tournament.link.substring(0, 255)}...`
                : tournament.link
            }
            route={`/torneos/torneo/${tournament.id}`}
          />
        ))}
      </div>
    </main>
  );
};

export default Tournaments;
