import React from 'react';
import { Link } from 'react-router-dom';
import '@styles/MoreActors.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the more actors component with all its functions
 * stored inside for its full operation
 */
const MoreActors = (props) => {
  // Component's props
  const { name, image, route } = props;

  return (
    <Link className='more-actors__card' to={route}>
      <img className='more-actors__card--image' src={image} alt='Profile picture' />
      <h3 className='more-actors__card--name'>{name}</h3>
    </Link>
  );
};

export default MoreActors;
