import React from 'react';
import { Link } from 'react-router-dom';

const GrayButton = (props) => {
  const { name, route } = props;

  return (
    <Link className='button gray-button' to={route}>
      {name}
    </Link>
  );
};

export default GrayButton;
