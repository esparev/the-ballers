import React from 'react';
import PrimaryButton from '@components/PrimaryButton';
import '@styles/Card.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the cards component with all its functions
 * stored inside for its full operation
 * @param {*} props
 * @returns JSX code to render to the DOM tree
 */
const Card = (props) => {
  // Parameters that the function will receive
  const { title, cover, date, category, description, link, route } = props;

  return (
    <div className='card'>
      {cover ? <img className='card--image' src={cover} alt='Cover of the news' /> : null}

      <div className='card__info-container'>
        <div className='card__info'>
          <h2 className='card__info--title'>{title}</h2>
          <div className='card__meta-info'>
            <p>{date}</p>
            <p>•</p>
            <p className='card__meta-info--category'>{category}</p>
          </div>
          <p className='card--description'>
            {description}
            <a className='card--link' href={link} target='_blank' rel='noopener noreferrer'>
              {link}
            </a>
          </p>
        </div>

        <PrimaryButton name='See more' route={route} />
      </div>
    </div>
  );
};

export default Card;
