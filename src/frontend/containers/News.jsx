import React, { useEffect } from 'react';
import NewsCard from '../components/Card';
import ButtonContainer from './ButtonContainer';
import YellowButton from '../components/YellowButton';
import useGetNews from '../hooks/useGetNews';
import moment from 'moment';
import '../assets/styles/components/CardsContainer.scss';

const API = 'https://beismich.herokuapp.com/api/v1/noticias';

const News = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Noticias';
    window.scrollTo(0, 0);
  }, []);

  moment.locale('es');
  const news = useGetNews(API);

  return (
    <main>
      <div className='cards__container'>
        <h1 className='cards__container--title'>Noticias</h1>

        {news.map((news) => (
          <NewsCard
            news={news}
            key={news.id}
            title={news.title}
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
        {/* <NewsCard
          title='BEISMICH manda liga de Morelia al mundial'
          date='Octubre 26, 2021'
          category='Noticia'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies quis egestas aliquet leo amet, eget. Sit vitae amet, sollicitudin ac placerat. Pellentesque in enim fusce enim sit mi turpis sed. Sagittis, ac eget enim duis venenatis netus elementum nisi elit. Ac, vel viverra sed tincidunt et ipsum interdum in in. Sed cras sagittis nec sed nam. Nisl interdum sit tincidunt fringilla facilisis.'
          route='/noticias/noticia'
        /> */}

        {localStorage.getItem('id') ? (
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
