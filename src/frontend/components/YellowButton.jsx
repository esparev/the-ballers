import React from 'react';
import { Link } from 'react-router-dom';

const YellowButton = (props) => {
  const { name, route, onClick } = props;

  const nothing = () => {};

  return (
    <Link
      className='button yellow-button'
      to={route}
      onClick={onClick || nothing}
    >
      {name}
    </Link>
  );
};

export default YellowButton;
