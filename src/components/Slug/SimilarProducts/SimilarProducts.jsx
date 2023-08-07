import ProductCard from '../../ProductCard/ProductCard';
import styles from './SimilarProducts.module.css';

const SimilarProducts = ({ similarProducts }) => {
  return (
    <div className={styles['similar-prods-wrapper']}>
      <h2>You may also like</h2>

      {/* Scrolling part - list of scrolling divs */}
      <div className={styles.marquee}>
        <div className={styles.track}>
          {similarProducts.map(item => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SimilarProducts;
