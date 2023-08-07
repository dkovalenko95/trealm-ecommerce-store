import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import styles from './QuantityControl.module.css';
import { useStateContext } from '../../../context/StateContext';

const QuantityControl = () => {
  const { qty, incQty, decQty } = useStateContext();

  return (
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
  );
}

export default QuantityControl;
