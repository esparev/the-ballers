import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Entity.scss';

const Entity = (props) => {
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
