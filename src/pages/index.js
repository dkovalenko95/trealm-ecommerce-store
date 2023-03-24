import React from 'react';
import { client } from '../lib/client';
import { HeroBanner, Product, FooterBanner, Tabs } from './../components/index';
import styles from './index.module.css';

const Home = ({ products, bannerData }) => {
  return (
    <>
      {/* <Tabs 
        title={'Tabs'}
        tabs={[
          { name: 'Laptops', content: ['HP', 'ASUS', 'APPLE']},
          { name: 'HeadPhones', content: ['SONY', 'APPLE'] },
          { name: 'EarPhones', content: ['APPLE', 'VIC', 'PAC'] },
          { name: 'Other', content: ['WATCH', 'SPEAKER'] },
        ]}
      /> */}
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className={styles['products-heading']}>
        <h2>Best Selling Products</h2>
        <p>A large selection of high quality headphones</p>
      </div>

      <div className={styles['products-container']}>
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
