import React from 'react';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the red button component with all its functions
 * stored inside for its full operation
 * @param {*} props
 * @returns JSX code to render to the DOM tree
 */
const DangerButton = (props) => {
  // Component's props
  const { name, onClick } = props;

  return (
    <a className='button danger-button' onClick={onClick}>
      {name}
    </a>
  );
};

export default DangerButton;
