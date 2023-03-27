// Fact that name of file is inside of square brackets '[slug].js' means that this comp is going to be dynamic
import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { client, urlFor } from '../../lib/client';
import Product from '../../components/Product/Product';
import { useStateContext } from '../../context/StateContext';
import styles from './slug.module.css';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
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
              src={urlFor(image && image[imgIndex])}
              alt='product'
            />
          </div>
          <div className={styles['small-images-container']}>
            {image?.map((item, i) => (
              <img
                key={item._key}
                src={urlFor(item)}
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
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
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
// When you export a func called getStaticPaths() (Static Site Generation) from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths()
// https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
export const getStaticPaths = async () => {
  const query = `*[_type == "laptops"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map(product => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
};

// Pre-render this page at build time using the props returned
// getStaticProps(): A method that tells the Next component to populate props and render into a static HTML page at BUILD time.
// https://nextjs.org/docs/basic-features/data-fetching/get-static-props
// Fetch prod details
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "laptops" && slug.current == '${slug}'][0]`;
  const similarProductsQuery = '*[_type == "laptops"]';

  const product = await client.fetch(query);
  const products = await client.fetch(similarProductsQuery);

  // console.log(product);

  return {
    props: { product, products }
  }
};

export default ProductDetails;
