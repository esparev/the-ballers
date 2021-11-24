import React from 'react';
import '../assets/styles/components/Entity.scss';

const Entity = (props) => {
  const { name, logo } = props;
  return (
    <div className='entity'>
      <a href='#'>
        <img className='entity--image' src={logo} alt={name} />
      </a>
      <p className='entity--name'>{name}</p>
    </div>
  );
};

export default Entity;
