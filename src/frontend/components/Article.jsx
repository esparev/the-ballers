import React from 'react';
import YellowButton from './YellowButton';
import '../assets/styles/components/Articles.scss';

const Articles = (props) => {
  const { title, cover, date, category, route } = props;

  return (
    <div className='more-articles__card'>
      <img
        className='more-articles__card--image'
        src={cover}
        alt='Portada del tema'
      />

      <div className='more-articles__card-info'>
        <div className='card__info'>
          <h2 className='more-articles__card--title'>{title}</h2>
          <div className='more-articles__card--info card__about'>
            <p>{date}</p>
            <p>•</p>
            <p className='card--category'>{category}</p>
          </div>
        </div>
        <YellowButton name='Ver más' route={route} />
      </div>
    </div>
  );
};

export default Articles;
