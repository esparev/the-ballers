import React from 'react';
import YellowButton from './YellowButton';
import '../assets/styles/components/Articles.scss';

const Articles = (props) => {
  const { title, date, category } = props;

  return (
    <div className='more-articles__card'>
      <img
        className='more-articles__card--image'
        src='https://www.collinsdictionary.com/images/full/baseball_557405302_1000.jpg'
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
        
        <YellowButton name='Ver más' route='/pending' />
      </div>
    </div>
  );
};

export default Articles;
