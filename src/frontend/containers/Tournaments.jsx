import React, { useEffect } from 'react';
import moment from 'moment';
import Cookie from 'js-cookie';
import TournamentCard from '../components/Card';
import ButtonContainer from './ButtonContainer';
import YellowButton from '../components/YellowButton';
import useGetTournaments from '../hooks/useGetTournaments';
import sortByDate from '../utils/functions/sortByDate';
import { envConfig } from '../utils/config';
import '../assets/styles/components/CardsContainer.scss';

const Tournaments = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Torneos';
    window.scrollTo(0, 0);
  }, []);

  moment.locale('es');
  const tournaments = useGetTournaments(envConfig.apiUrl);
  sortByDate(tournaments);

  return (
    <main>
      <div className='cards__container'>
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

        {/* {localStorage.getItem('id') ? ( */}
        {Cookie.get('id') ? (
          <ButtonContainer>
            <YellowButton name='Nuevo Torneo' route='/torneos/nuevo-torneo' />
          </ButtonContainer>
        ) : null}
      </div>
    </main>
  );
};

export default Tournaments;
