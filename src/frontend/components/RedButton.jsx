import React from 'react';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the red button component with all its functions 
 * stored inside for its full operation
 * @param {*} props 
 * @returns JSX code to render to the DOM tree
 */
const RedButton = (props) => {
  // Parameters that the function will receive
  const { name, onClick } = props;

  return (
    <a className='button red-button' onClick={onClick}>
      {name}
    </a>
  );
};

export default RedButton;
