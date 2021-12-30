import React from 'react';
import Header from './Header';
import Footer from './Footer';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the layout component to have consistency
 * across all containers and pages with the header and footer
 * @param {*} param0 - JSX component
 * @returns JSX code to render to the DOM tree
 */
const Layout = ({ children }) => (
  <div className='App'>
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
