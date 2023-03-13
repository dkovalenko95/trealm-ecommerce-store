import React from 'react';
import { client } from '../lib/client';
import { HeroBanner, Product, FooterBanner } from './../components/index';

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>A large selection of high quality headphones</p>
      </div>

      <div className='products-container'>
        {products?.map((product) => 
          <Product 
            key={product._id}
            product={product}
          />)
        }
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

// Fetch data from CMS
// getServerSideProps(): A method that tells the Next comp to populate the props and render into a static HTML page at RUN time.
// https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
export const getServerSideProps = async () => {
  // Sanity query -> take all prods from Sanity dashboard
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  // Take banner
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}; // -> whatever getServerSideProps() returns that gets populated in comp

export default Home;
