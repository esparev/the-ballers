import React from 'react';
import { Link } from 'react-router-dom';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the gray button component with all its functions
 * stored inside for its full operation
 * @param {*} props
 * @returns JSX code to render to the DOM tree
 */
const GrayButton = (props) => {
  // Parameters that the function will receive
  const { name, route, onClick } = props;

  /**
   * Does nothing
   * Its declared in case the component
   * is imported but onClick function is
   * not necessary or is not defined
   */
  const nothing = () => {};

  return (
    <Link
      className='button gray-button'
      to={route}
      onClick={onClick || nothing}
    >
      {name}
    </Link>
  );
};

export default GrayButton;
