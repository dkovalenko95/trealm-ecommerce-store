import React from 'react';
import Link from 'next/link';

// urlFor() - used to get the url for the img inside Sanity dashboard
import { urlFor } from '../../lib/client';
import { useStateContext } from '../../context/StateContext';
import styles from './Product.module.css';

const Product = ({ product: { image, name, slug, price, oldPrice } }) => {
  const { setQty } = useStateContext();
  return (
    <div>
      <Link onClick={() => setQty(1)} href={`/product/${slug.current}`}>
        <div className={styles['product-card']}>
          <img
            className={styles['product-image']}
            src={urlFor(image && image[0])}
            // width={250}
            // height={250}
          />
          <div className={styles['product-descr']}>
            <p className={styles['product-name']}>{name}</p>
            {oldPrice && <p className={styles['product-oldPrice']}>${oldPrice}</p>}
            <p className={styles['product-price']}>${price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
