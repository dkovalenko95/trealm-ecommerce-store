import React from 'react';

const Home = () => {
  return (
    <>
      HeroBanner

      <div>
        <h2>Best Selling Products</h2>
        <p>A large selection of high quality headphones</p>
      </div>

      <div>
        {['Prod 1', 'Prod 2', 'Prod 3'].map((product) => product)}
      </div>

      Footer
    </>
  );
};

export default Home;
