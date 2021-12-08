import React from 'react';

const RedButton = (props) => {
  const { name, onClick } = props;

  return (
    <a className='button red-button' onClick={onClick}>
      {name}
    </a>
  );
};

export default RedButton;
