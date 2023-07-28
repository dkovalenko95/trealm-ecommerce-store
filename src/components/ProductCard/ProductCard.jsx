import Link from 'next/link';
import { urlFor } from '../../lib/client'; // -> get url of img from Sanity dashboard
import { useStateContext } from '../../context/StateContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product: { image, name, slug, price, oldPrice } }) => {
  const { setQty } = useStateContext();
  return (
    <div>
      <Link onClick={() => setQty(1)} href={`/product/${slug.current}`}>
        <div className={styles['product-card']}>
          <img
            className={styles['product-image']}
            src={urlFor(image && image[0]).url()}
            alt='product image'
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

export default ProductCard;
