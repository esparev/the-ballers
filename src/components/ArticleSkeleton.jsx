import React from 'react';
import '@styles/Skeleton.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the articles component with all its functions
 * stored inside for its full operation
 */
const ArticleSkeleton = () => {
  return (
    <div className='skeleton__card'>
      <div className='skeleton__card--img' />

      <div className='skeleton__card-info'>
        <div className='skeleton__text--xl' />
        <div className='skeleton__text--lg' />
        <div className='skeleton__text--xl' />
        <div className='skeleton__text--sm' />
        <div className='skeleton__text--md' />
        <div className='skeleton__text--sm' />
      </div>
    </div>
  );
};

export default ArticleSkeleton;
