import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Actor.scss';

const AdminActor = (props) => {
  const { name, image, position, route } = props;

  return (
    <Link className='admin__card' to={route}>
      <img
        className='admin__card--image'
        src={image}
        alt='Foto de perfil'
      />
      <div className='admin__card-info'>
        <h3 className='admin__card-info--name'>{name}</h3>
        {position ? (
          <p className='admin__card--position'>{position}</p>
        ) : null}
      </div>
    </Link>
  );
};

export default AdminActor;
