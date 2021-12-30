import React from 'react';
import { Link } from 'react-router-dom';

const GrayButton = (props) => {
  const { name, route, onClick } = props;

  const nothing = () => {};

  return (
    <Link
      className='button gray-button'
      to={route}
      onClick={onClick || nothing}
    >
      {name}
    </Link>
  );
};

export default GrayButton;
