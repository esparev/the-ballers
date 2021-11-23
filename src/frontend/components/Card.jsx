import React from 'react';
import '../assets/styles/components/Card.scss';

const Card = (props) => {
  const { title, date, category, description, link } = props;

  return (
    <div className='card'>
      <img
        className='card--image'
        src='https://www.collinsdictionary.com/images/full/baseball_557405302_1000.jpg'
        alt=''
      />
      <div className='card__info-container'>
        <div className='card__info'>
          <h2 className='card__info--title'>{title}</h2>
          <div className='card__about'>
            <p>{date}</p>
            <p>•</p>
            <p className='card--category'>{category}</p>
          </div>
          <p className='card--description'>
            {description}
            <a className='card--link'>{link}</a>
          </p>
        </div>
        <button
          className='button yellow-button'
          onClick="location.href='./individual-news.html'"
        >
          Ver más
        </button>
      </div>
    </div>
  );
};

export default Card;
