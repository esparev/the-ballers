import React from 'react';
import PrimaryButton from '@components/Buttons/PrimaryButton';
import '@styles/Articles.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the articles component with all its functions
 * stored inside for its full operation
 */
const Articles = (props) => {
  // Component's props
  const { title, cover, date, category, route } = props;

  return (
    <div className='article__card'>
      {cover ? <img className='article__card--img' src={cover} alt='Portada del tema' /> : null}

      <div className='article__card-info'>
        <h2 className='article__card--title'>{title}</h2>
        <div className='card__about'>
          <p>{date}</p>
          <p>•</p>
          <p className='card--category'>{category}</p>
        </div>
        <div>
          <PrimaryButton name='See more' route={route} />
        </div>
      </div>
    </div>
  );
};

export default Articles;
