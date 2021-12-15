import React, { useEffect } from 'react';
import NewsCard from '../components/Card.jsx';
import ButtonContainer from './ButtonContainer.jsx';
import YellowButton from '../components/YellowButton.jsx';
import '../assets/styles/components/CardsContainer.scss';

const News = () => {
  useEffect(() => {
    document.title = 'BEISMICH • Noticias';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <div className='cards__container'>
        <h1 className='cards__container--title'>Noticias</h1>

        <NewsCard
          title='BEISMICH manda liga de Morelia al mundial'
          date='Octubre 26, 2021'
          category='Noticia'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies quis egestas aliquet leo amet, eget. Sit vitae amet, sollicitudin ac placerat. Pellentesque in enim fusce enim sit mi turpis sed. Sagittis, ac eget enim duis venenatis netus elementum nisi elit. Ac, vel viverra sed tincidunt et ipsum interdum in in. Sed cras sagittis nec sed nam. Nisl interdum sit tincidunt fringilla facilisis.'
          route='/noticias/noticia'
        />
        <NewsCard
          title='BEISMICH manda liga de Morelia al mundial'
          date='Octubre 26, 2021'
          category='Noticia'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies quis egestas aliquet leo amet, eget. Sit vitae amet, sollicitudin ac placerat. Pellentesque in enim fusce enim sit mi turpis sed. Sagittis, ac eget enim duis venenatis netus elementum nisi elit. Ac, vel viverra sed tincidunt et ipsum interdum in in. Sed cras sagittis nec sed nam. Nisl interdum sit tincidunt fringilla facilisis.'
          route='/noticias/noticia'
        />
        <NewsCard
          title='BEISMICH manda liga de Morelia al mundial'
          date='Octubre 26, 2021'
          category='Noticia'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies quis egestas aliquet leo amet, eget. Sit vitae amet, sollicitudin ac placerat. Pellentesque in enim fusce enim sit mi turpis sed. Sagittis, ac eget enim duis venenatis netus elementum nisi elit. Ac, vel viverra sed tincidunt et ipsum interdum in in. Sed cras sagittis nec sed nam. Nisl interdum sit tincidunt fringilla facilisis.'
          route='/noticias/noticia'
        />

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
