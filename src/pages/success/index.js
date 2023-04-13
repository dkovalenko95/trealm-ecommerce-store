import { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { runFireworks } from '../../lib/utils';
import { useStateContext } from '../../context/StateContext';
import styles from './success.module.css';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQties } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQties(0);
    runFireworks();
  }, []);

  return (
    <div className={styles['success-wrapper']}>
      <div className={styles.success}>
        <p className={styles.icon}>
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className={styles['email-msg']}>
          Check your email inbox for the receipt.
        </p>
        <p className={styles.description}>
          If you have any questions, please email to
          <a className={styles.email} href='mailto:order@example.com'>
            order@example.com
          </a>
        </p>
        <Link href='/'>
          <button
            type='button'
            className={styles.btn}
            width='300px'
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
