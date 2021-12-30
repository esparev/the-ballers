import React from 'react';
import '../assets/styles/components/EntityContainer.scss'
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the entity container component 
 * that can contain other components within it
 * @param {*} param0 - JSX component
 * @returns JSX code to render to the DOM tree
 */
const EntityContainer = ({ children }) => {
  return <div className='entities__container'>{children}</div>;
};

export default EntityContainer;
