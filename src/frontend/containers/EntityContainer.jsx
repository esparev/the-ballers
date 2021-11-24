import React from 'react';
import '../assets/styles/components/EntityContainer.scss'

const EntityContainer = ({ children }) => {
  return <div className='entities__container'>{children}</div>;
};

export default EntityContainer;
