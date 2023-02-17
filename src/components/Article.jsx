import React from 'react';
import PrimaryButton from '@components/PrimaryButton';
import '@styles/Articles.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the articles component with all its functions
 * stored inside for its full operation
 * @param {*} props
 * @returns JSX code to render to the DOM tree
 */
const Articles = (props) => {
  // Parameters that the function will receive
  const { title, cover, date, category, route, onClick } = props;

  /**
   * Does nothing
   * Its declared in case the component
   * is imported but onClick function is
   * not necessary or is not defined
   */
  const nothing = () => {};

  return (
    <div className='more-articles__card'>
      {cover ? (
        <img
          className='more-articles__card--image'
          src={cover}
          alt='Portada del tema'
        />
      ) : null}

      <div className='more-articles__card-info'>
        <div className='card__info'>
          <h2 className='more-articles__card--title'>{title}</h2>
          <div className='more-articles__card--info card__about'>
            <p>{date}</p>
            <p>•</p>
            <p className='card--category'>{category}</p>
          </div>
        </div>
        <div onClick={onClick ? onClick : nothing}>
          <PrimaryButton name='Ver más' route={route} />
        </div>
      </div>
    </div>
  );
};

export default Articles;
