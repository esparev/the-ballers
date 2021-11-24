import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Actor.scss';

const Actor = (props) => {
  const { name, image, position, route } = props;

  return (
    <Link className='actor__card' to={route}>
      <img
        className='actor__card--image'
        src={image}
        alt='Foto del jugador'
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
