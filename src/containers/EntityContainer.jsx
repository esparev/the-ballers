import React from 'react';
import '@styles/EntityContainer.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the entity container component 
 * that can contain other components within it
 */
const EntityContainer = ({ children }) => {
  return <div className='entities__container'>{children}</div>;
};

export default EntityContainer;
