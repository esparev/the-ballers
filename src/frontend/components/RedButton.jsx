import React from 'react';
import { Link } from 'react-router-dom';

const RedButton = (props) => {
  const { name, route } = props;

  return (
    <Link className='button red-button' to={route}>
      {name}
    </Link>
  );
};

export default RedButton;
