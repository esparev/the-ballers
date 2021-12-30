import React, { useEffect } from 'react';
import { HashRouter, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import moment from 'moment';
import TournamentCard from '../components/Card';
import ButtonContainer from './ButtonContainer';
import useGetTournaments from '../hooks/useGetTournaments';
import sortByDate from '../utils/functions/sortByDate';
import { envConfig } from '../utils/config';
import '../assets/styles/components/CardsContainer.scss';

const Tournaments = () => {
  moment.locale('es');

  const tournaments = useGetTournaments(envConfig.apiUrl);

  sortByDate(tournaments);

  const loadPage = (location) => {
    window.location.href = location;
    setTimeout(window.location.reload(), 500);
  };

  const handleLoad = () => {
    loadPage(`/#/torneos/nuevo-torneo`);
  };

  useEffect(() => {
    document.title = 'BEISMICH • Torneos';
    window.scrollTo(0, 0);

    const search = document.getElementById('searchBar');

    search.addEventListener('keyup', (e) => {
      const searchString = e.target.value.toLowerCase();

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
              {/* <Link
                className='button yellow-button'
                to='/torneos/nuevo-torneo'
                style={{ marginRight: 0 }}
              >
                Nuevo Torneo
              </Link> */}
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
