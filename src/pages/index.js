import { client } from '../lib/client';
import { SliderHeroBanner, ProductCard, FooterBanner, Tabs } from './../components/index';
import styles from './index.module.css';

const Home = ({ bannerData, bestsellersData, laptoptsData, headphonesData, headphonesTWSData, otherData }) => {
  const allProducts = [...laptoptsData, ...headphonesData, ...headphonesTWSData, ...otherData];
  const all = allProducts.map(product => (
    <ProductCard 
      key={product._id}
      product={product}
    />
  ));
  const bestsellers = bestsellersData.map(product => (
    <ProductCard
      key={product._id}
      product={product}
    />
  ))
  const laptops = laptoptsData.map(product => (
    <ProductCard 
      key={product._id}
      product={product}
    />
  ));
  const headphones = headphonesData.map(product => (
    <ProductCard 
      key={product._id}
      product={product}
    />
  ));
  const headphonesTWS = headphonesTWSData.map(product => (
    <ProductCard 
      key={product._id}
      product={product}
    />
  ));
  const other = otherData.map(product => (
    <ProductCard 
      key={product._id}
      product={product}
    />
  ));

  return (
    <>
      <SliderHeroBanner slides={bannerData} />

      <div className={styles['products-heading']}>
        <h2>Choose products for you need</h2>
        <p>A great selection of high quality laptops and headphones</p>
      </div>

      <Tabs 
        title={'Products Tabs'}
        tabs={[
          { name: 'Bestsellers', content: bestsellers },
          { name: 'All', content: all },
          { name: 'Laptops', content: laptops },
          { name: 'HeadPhones', content: headphones },
          { name: 'EarPhones', content: headphonesTWS },
          { name: 'Other', content: other },
        ]}
      />

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

// Fetch data from CMS
// getServerSideProps() - tells Next comp to populate the props and render into a static HTML page at RUN time.
export const getServerSideProps = async () => {
  // Sanity query -> take types of prods from Sanity dashboard
  // Banner
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  //Bestsellers
  const bestsellersQuery = '*[_type == "bestseller"]';
  const bestsellersData = await client.fetch(bestsellersQuery);
  // Laptops
  const laptopsQuery = '*[_type == "laptops"]';
  const laptoptsData = await client.fetch(laptopsQuery);
  // Headphones
  const headphonesQuery = '*[_type == "headphones"]';
  const headphonesData = await client.fetch(headphonesQuery);
  // Headphones TWS
  const headphonesTWSQuery = '*[_type == "headphones-tws"]';
  const headphonesTWSData = await client.fetch(headphonesTWSQuery);
  // Headphones TWS
  const otherQuery = '*[_type == "other"]';
  const otherData = await client.fetch(otherQuery);

  return {
    props: {
      bannerData,
      bestsellersData,
      laptoptsData,
      headphonesData,
      headphonesTWSData,
      otherData,
    }
  };
};

export default Home;
