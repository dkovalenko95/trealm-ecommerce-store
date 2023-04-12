// Name of file is inside of square brackets '[slug].js' means that comp is dynamic
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { client, urlFor } from '../../lib/client';
import Product from '../../components/Product/Product';
import ProductRatings from '../../components/ProductRatings/ProductRatings';
import { useStateContext } from '../../context/StateContext';
import styles from './slug.module.css';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, oldPrice } = product;
  const [imgIndex, setImgIndex] = useState(0);
  const { incQty, decQty, qty, onAddProduct, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAddProduct(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className={styles['product-detail-container']}>
        <div>
          <div>
            <img
              className={styles['product-detail-image']}
              src={urlFor(image && image[imgIndex]).url()}
              alt='product'
            />
          </div>
          <div className={styles['small-images-container']}>
            {image?.map((item, i) => (
              <img
                key={item._key}
                src={urlFor(item).url()}
                alt='similar image'
                className={
                  i === imgIndex ? `${styles['small-image']} ${styles['selected-image']}` : `${styles['small-image']}`}
                onMouseEnter={() => setImgIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className={styles['product-detail-desc']}>
          <h1>{name}</h1>
          <div className={styles.reviews}>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(15)</p>
            <ProductRatings product={product} />
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          {oldPrice && <p className={styles.oldPrice}>${oldPrice}</p>}
          <p className={styles.price}>${price}</p>
          <div className={styles.quantity}>
            <h3>Quantity:</h3>
            <p className={styles['quantity-desc']}>
              <span
                className={styles.minus}
                onClick={decQty}
              >
                <AiOutlineMinus size={20} />
              </span>
              <span className={styles.num}>
                {qty}
              </span>
              <span
                className={styles.plus}
                onClick={incQty}
              >
                <AiOutlinePlus size={20} />
              </span>
            </p>
          </div>

          <div className={styles.buttons}>
            <button
              type='button'
              className={styles['add-to-cart']}
              onClick={() => onAddProduct(product, qty)}
            >
              Add to Cart
            </button>
            <button
              type='button'
              className={styles['buy-now']}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className={styles['maylike-products-wrapper']}>
        <h2>You may also like</h2>

        {/* Scrolling part - list of scrolling divs */}
        <div className={styles.marquee}>
          <div className={`${styles['maylike-products-container']} ${styles.track}`}>
            {products.map(item => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// If a page has Dynamic Routes and uses getStaticProps(), it needs to define a list of paths to be statically generated.
// By exporting getStaticPaths() (Static Site Generation) from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths()
export const getStaticPaths = async () => {
  const laptopsQuery = `*[_type == "laptops"] { slug { current } }`;
  const laptopsProducts = await client.fetch(laptopsQuery);
  const laptopsPaths = laptopsProducts.map(product => ({
    params: { slug: product.slug.current }
  }));
  const headphonesQuery = `*[_type == "headphones"] { slug { current } }`;
  const headphonesProducts = await client.fetch(headphonesQuery);
  const headphonesPaths = headphonesProducts.map(product => ({
    params: { slug: product.slug.current }
  }));
  const headphonesTWSQuery = `*[_type == "headphones-tws"] { slug { current } }`;
  const headphonesTWSProducts = await client.fetch(headphonesTWSQuery);
  const headphonesTWSPaths = headphonesTWSProducts.map(product => ({
    params: { slug: product.slug.current }
  }));
  const otherQuery = `*[_type == "other"] { slug { current } }`;
  const otherProducts = await client.fetch(otherQuery);
  const otherPaths = otherProducts.map(product => ({
    params: { slug: product.slug.current }
  }));
  
  return {
    paths: [],
    fallback: 'blocking'
  }
};

// Pre-render page at BUILD time using returned props 
// getStaticProps() - tells Next comp to populate props and render into a static HTML page at BUILD time.
// Fetch prod details
// TODO: Fetch multiple documents in one go -> try to implement from Sanity docs
export const getStaticProps = async ({ params: { slug } }) => {
  const laptopsQuery = `*[_type == "laptops" && slug.current == '${slug}'][0]`;
  const headphonesQuery = `*[_type == "headphones" && slug.current == '${slug}'][0]`;
  const headphonesTWSQuery = `*[_type == "headphones-tws" && slug.current == '${slug}'][0]`;
  const otherQuery = `*[_type == "other" && slug.current == '${slug}'][0]`;

  const laptopsProduct = await client.fetch(laptopsQuery);
  const headphonesProduct = await client.fetch(headphonesQuery);
  const headphonesTWSProduct = await client.fetch(headphonesTWSQuery);
  const otherProduct = await client.fetch(otherQuery);

  const product = laptopsProduct || headphonesProduct || headphonesTWSProduct || otherProduct;

  const similarLaptoptsQuery = '*[_type == "laptops"]';
  const similarHeadphonesQuery = '*[_type == "headphones"]';
  const similarHeadphonesTWSQuery = '*[_type == "headphones-tws"]';
  const similarOtherQuery = '*[_type == "other"]';

  const similarLaptops = await client.fetch(similarLaptoptsQuery);
  const similarHeadphones = await client.fetch(similarHeadphonesQuery);
  const similarHeadphonesTWS = await client.fetch(similarHeadphonesTWSQuery);
  const similarOther = await client.fetch(similarOtherQuery);

  let products;
  if (laptopsProduct) products = similarLaptops;
  if (headphonesProduct) products = similarHeadphones;
  if (headphonesTWSProduct) products = similarHeadphonesTWS;
  if (otherProduct) products = similarOther;

  return {
    props: { product, products }
  }
};

export default ProductDetails;
