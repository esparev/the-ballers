import React from 'react';
import '@styles/Skeleton.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the cards component with all its functions
 * stored inside for its full operation
 */
const CardSkeleton = () => {
  return (
    <div className='skeleton__card news-card-skeleton'>
      <div className='skeleton__card--img' />

      <div className='skeleton__card-info'>
        <div className='skeleton__text--xl' />
        <div className='skeleton__text--lg' />
        <div className='skeleton__text--xl' />
        <div className='skeleton__text--md' />
        <div className='skeleton__text--sm' />
      </div>
    </div>
  );
};

export default CardSkeleton;
