import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/MoreActors.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the more actors component with all its functions 
 * stored inside for its full operation
 * @param {*} props 
 * @returns JSX code to render to the DOM tree
 */
const MoreActors = (props) => {
  // Parameters that the function will receive
  const { name, image, route } = props;

  return (
    <Link className='more-actors__card' to={route}>
      <img
        className='more-actors__card--image'
        src={image}
        alt='Foto del perfil'
      />
      <h3 className='more-actors__card--name'>{name}</h3>
    </Link>
  );
};

export default MoreActors;
