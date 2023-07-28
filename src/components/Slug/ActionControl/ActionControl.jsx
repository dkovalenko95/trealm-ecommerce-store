import styles from './ActionControl.module.css';
import { useStateContext } from '../../../context/StateContext';

const ActionControl = ({ product }) => {
  const { qty, onAddProduct, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAddProduct(product, qty);
    setShowCart(true);
  };

  return (
    <div className={styles.btns}>
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
  );
}

export default ActionControl;
