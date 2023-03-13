// Fact that name of file is inside of square brackets '[slug].js' means that this comp is going to be dynamic
import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div>
            <img
              className='product-detail-image'
              src={urlFor(image && image[imgIndex])}
              alt='product'
            />
          </div>
          <div className='small-images-container'>
            {image?.map((item, i) => (
              <img
                key={item._key}
                src={urlFor(item)}
                className={i === imgIndex ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setImgIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span
                className='minus'
                // onClick={}
              >
                <AiOutlineMinus />
              </span>
              <span
                className='num'
                // onClick={}
              >
                0
              </span>
              <span
                className='plus'
                // onClick={}
              >
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className='buttons'>
            <button
              type='button'
              className='add-to-cart'
              // onClick={}
            >
              Add to Cart
            </button>
            <button
              type='button'
              className='buy-now'
              // onClick={}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>

        {/* Scrolling part - list of scrolling divs */}
        <div className='marquee'>
          <div className='maylike-products-container track'>
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
  const query = `*[_type == "product"] {
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
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const similarProductsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(similarProductsQuery);

  return {
    props: { product, products }
  }
};

export default ProductDetails;
