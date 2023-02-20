import React, { useEffect } from 'react';
import '@styles/About.scss';
// ---------------------------------------- END OF IMPORTS

/**
 * Contains the About page
 * @returns JSX code to render to the DOM tree
 */
const About = () => {
  useEffect(() => {
    document.title = 'The Ballers • About Us';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className='about'>
      <figure className='about__figure'>
        <img
          src='https://globalsportmatters.com/wp-content/uploads/2021/10/llws.jpeg'
          alt='Baseball match'
        />
      </figure>
      <section className='who'>
        <h1 className='who--title'>About us</h1>
        <p className='about--description'>
          The Ballers is a premier baseball association dedicated to fostering excellence in the
          sport of baseball. Our mission is to provide a platform for athletes of all levels to
          develop their skills and showcase their talents, while promoting the values of teamwork,
          sportsmanship, and fair play.
        </p>
        <p className='about--description'>
          At the heart of our organization is a commitment to excellence in all aspects of the game,
          from hitting and pitching to fielding and strategy. We believe that by providing a
          supportive and challenging environment for our players, we can help them reach their full
          potential and achieve success both on and off the field.
        </p>
        <p className='about--description'>
          With a deep respect for the history and traditions of baseball, we are proud to be a part
          of this great sport, and to help shape the future of the game by nurturing the next
          generation of talented players. Whether you are a seasoned veteran or a young
          up-and-comer, we invite you to join us in our pursuit of excellence, and to experience the
          thrill and excitement of baseball at its highest level.
        </p>
      </section>
      <hr />
      <section className='pros'>
        <h2 className='pros--title'>Advantages of being part of The Ballers</h2>
        <p className='about--description'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio praesentium quaerat
          quos commodi, nam eius sit voluptate enim. Sed molestiae facere magni exercitationem quod
          repudiandae. Quaerat molestiae culpa dolorum voluptate. Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Distinctio praesentium quaerat quos commodi, nam eius sit
          voluptate enim. Sed molestiae facere magni exercitationem quod repudiandae. Quaerat
          molestiae culpa dolorum voluptate.
        </p>
      </section>
    </main>
  );
};

export default About;
