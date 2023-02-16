import React from 'react';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the button container component 
 * that can contain other components within it
 * @param {*} param0 - JSX component
 * @returns JSX code to render to the DOM tree
 */
const ButtonContainer = ({ children }) => {
  return <div className='button-container'>{children}</div>;
};

export default ButtonContainer;
