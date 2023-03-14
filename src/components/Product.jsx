import React from 'react';
import Link from 'next/link';

// urlFor - used to get the url for the image inside sanity dashboard
import { urlFor } from '../lib/client';
import { useStateContext } from '../context/StateContext';

const Product = ({ product: { image, name, slug, price } }) => {
  const { setQty } = useStateContext();
  return (
    <div>
      <Link onClick={() => setQty(1)} href={`/product/${slug.current}`}>
        <div className='product-card'>
          <img
            className='product-image'
            src={urlFor(image && image[0])}
            width={250}
            height={250}
          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
