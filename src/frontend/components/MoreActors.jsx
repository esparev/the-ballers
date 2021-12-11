import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/MoreActors.scss';

const MoreActors = (props) => {
  const { name, image, route } = props;

  return (
    <Link className='more-actors__card' to={route}>
      <img
        className='more-actors__card--image'
        src={image}
        alt='Foto del jugador'
      />
      <h3 className='more-actors__card--name'>{name}</h3>
    </Link>
  );
};

export default MoreActors;
