import RatingStars from '../../Ratings/RatingStars/RatingStars';
import QuantityControl from '../QuantityControl/QuantityControl';
import ActionControl from '../ActionControl/ActionControl';
import styles from './ProdDescr.module.css';

const ProdDescr = ({ product }) => {
  return (
    <div className={styles['product-detail-desc']}>
      <h1>{product.name}</h1>

      <RatingStars product={product} />
      
      <h4>Details: </h4>
      <p>{product.details}</p>
      {product.oldPrice && <p className={styles.oldPrice}>${product.oldPrice}</p>}
      <p className={styles.price}>${product.price}</p>
      
      <QuantityControl />

      <ActionControl product={product} />
    </div>
  );
}

export default ProdDescr;
