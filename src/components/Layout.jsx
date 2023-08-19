import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
// ---------------------------------------- END OF IMPORTS

/**
 * Creates the layout component to have consistency
 * across all containers and pages with the header and footer
 */
const Layout = ({ children }) => (
  <div className='App'>
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
