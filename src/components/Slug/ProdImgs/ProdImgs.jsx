import { useState } from 'react';
import { urlFor } from '../../../lib/client';
import styles from './ProdImgs.module.css';

const SlugImages = ({ product }) => {
  const [imgIndex, setImgIndex] = useState(0);
  return (
    <div>
      <div>
        <img
          className={styles['product-detail-image']}
          src={urlFor(product.image && product.image[imgIndex]).url()}
          alt='product'
        />
      </div>
      <div className={styles['small-images-container']}>
        {product.image?.map((item, i) => (
          <img
            key={item._key}
            src={urlFor(item).url()}
            alt='similar image'
            className={i === imgIndex ? `${styles['small-image']} ${styles['selected-image']}` : `${styles['small-image']}`}
            onMouseEnter={() => setImgIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default SlugImages;
