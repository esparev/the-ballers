import React from 'react';
import { Link } from 'react-router-dom';
import '@styles/Actor.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the actor component with all its functions 
 * stored inside for its full operation
 * @param {*} props 
 * @returns JSX code to render to the DOM tree
 */
const Actor = (props) => {
  // Parameters that the function will receive
  const { name, image, position, route } = props;

  return (
    <Link className='actor__card' to={route}>
      <img
        className='actor__card--image'
        src={image}
        alt='Foto de perfil'
      />
      <div className='actor__card-info'>
        <h3 className='actor__card-info--name'>{name}</h3>
        {position ? (
          <p className='actor__card--position'>{position}</p>
        ) : null}
      </div>
    </Link>
  );
};

export default Actor;
