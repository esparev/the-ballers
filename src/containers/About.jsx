import React from 'react';
import '@styles/About.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Contains the About page
 * @returns JSX code to render to the DOM tree
 */
const About = () => {
  return (
    <main className='about'>
      <section className='who'>
        <h1 className='who--title'>Quiénes somos</h1>
        <p className='about--description'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quasi
          similique non unde sunt ratione quisquam nostrum quaerat tempora.
          Obcaecati illum vitae aut consequuntur minus. Rem culpa laudantium
          nihil vero? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Ea quasi similique non unde sunt ratione quisquam nostrum quaerat
          tempora. Obcaecati illum vitae aut consequuntur minus. Rem culpa
          laudantium nihil vero?
        </p>
      </section>
      <section className='pros'>
        <h2 className='pros--title'>Pros de formar parte de BEISMICH</h2>
        <p className='about--description'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio
          praesentium quaerat quos commodi, nam eius sit voluptate enim. Sed
          molestiae facere magni exercitationem quod repudiandae. Quaerat
          molestiae culpa dolorum voluptate. Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Distinctio praesentium quaerat quos
          commodi, nam eius sit voluptate enim. Sed molestiae facere magni
          exercitationem quod repudiandae. Quaerat molestiae culpa dolorum
          voluptate.
        </p>
      </section>
    </main>
  );
};

export default About;
