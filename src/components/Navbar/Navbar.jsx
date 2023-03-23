import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../../context/StateContext';
import Cart from '../Cart/Cart';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { showCart, setShowCart, totalQties } = useStateContext();

  return (
    <div className={styles['navbar-container']}>

      <p className={styles.logo}>
        <Link href='/'>SNDRealm 🎧</Link>
      </p>

      <button
        type='button'
        className={styles['cart-icon']}
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className={styles['cart-item-qty']}>{totalQties}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
