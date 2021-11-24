import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Actor.scss';

const Actor = (props) => {
  const { name, image, position, route } = props;

  return (
    <Link className='more-actors__card' to={route}>
      <img
        className='more-actors__card--image'
        src={image}
        alt='Foto del jugador'
      />
      <div className='more-actors__card-info'>
        <h3 className='more-actors__card-info--name'>{name}</h3>
        {position ? (
          <p className='more-actors__card--position'>{position}</p>
        ) : null}
      </div>
    </Link>
  );
};

export default Actor;
