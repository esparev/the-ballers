import React from 'react';
import { Link } from 'react-router-dom';

const YellowButton = (props) => {
  const { name, route } = props;

  return (
    <Link className='button yellow-button' to={route}>
      {name}
    </Link>
  );
};

export default YellowButton;
