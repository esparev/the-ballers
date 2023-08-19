import React from 'react';
import { Link } from 'react-router-dom';
import '@styles/Actor.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the admin actor component with all its functions
 * stored inside for its full operation
 */
const AdminActor = (props) => {
  // Component's props
  const { name, image, route } = props;

  return (
    <Link className='admin__card' to={route}>
      <img className='admin__card--image' src={image} alt='Profile picture' />
      <div className='admin__card-info'>
        <h3 className='admin__card-info--name'>{name}</h3>
      </div>
    </Link>
  );
};

export default AdminActor;
