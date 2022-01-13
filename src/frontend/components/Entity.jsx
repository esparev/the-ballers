import React from 'react';
import { Link } from 'react-router-dom';
import '@styles/Entity.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the entity component with all its functions
 * stored inside for its full operation
 * @param {*} props
 * @returns JSX code to render to the DOM tree
 */
const Entity = (props) => {
  // Parameters that the function will receive
  const { name, logo, route } = props;

  return (
    <div className='entity'>
      <Link to={route}>
        <img className='entity--image' src={logo} alt={name} />
      </Link>
      <p className='entity--name'>{name}</p>
    </div>
  );
};

export default Entity;
