import React from 'react';

import { HeroBanner, Product, FooterBanner } from './../components/index';

const Home = () => {
  return (
    <>
      <HeroBanner />

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>A large selection of high quality headphones</p>
      </div>

      <div className='products-container'>
        {['Prod 1', 'Prod 2', 'Prod 3'].map((product) => product)}
      </div>

      <FooterBanner />
    </>
  );
};

export default Home;
