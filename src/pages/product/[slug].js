// Name of file is inside of square brackets '[slug].js' means that comp is dynamic
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { client, urlFor } from '../../lib/client';
import Product from '../../components/Product/Product';
import ProductRatings from '../../components/ProductRatings/ProductRatings';
import { useStateContext } from '../../context/StateContext';
import styles from './slug.module.css';

const ProductDetails = ({ product, similarProducts }) => {
  console.log(product, similarProducts);
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
            {/* <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(15)</p> */}
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
            {similarProducts.map(item => (
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
  const query = `*[_type in ["laptops", "headphones", "headphones-tws", "other"]] { slug { current } }`;
  const products = await client.fetch(query);
  const paths = products.map(product => ({
    params: { slug: product.slug.current }
  }));
  
  return {
    paths: [],
    fallback: 'blocking'
  }
};

// Pre-render page at BUILD time using returned props 
// getStaticProps() - tells Next comp to populate props and render into a static HTML page at BUILD time.
// Fetch prod details && similar prods
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type in ["laptops", "headphones", "headphones-tws", "other"] && slug.current == '${slug}']`;
  const [ product ] = await client.fetch(query);

  const similarQuery = `*[_type == "${product._type}" && slug.current != '${slug}']`;
  const similarProducts = await client.fetch(similarQuery);

  return {
    props: { product, similarProducts }
  }
};

export default ProductDetails;
