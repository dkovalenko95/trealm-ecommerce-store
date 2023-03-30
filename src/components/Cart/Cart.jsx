import React, { useRef } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { urlFor } from '../../lib/client';
import { useStateContext } from '../../context/StateContext';
import styles from './Cart.module.css';
import getStripe from '../../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const { setShowCart, cartItems, totalQties, totalPrice, toggleCartItemQty, onRemoveProduct } = useStateContext();

  // Payment handle
  const handleCheckout = async () => {
    // Get specific instance of Stripe
    const stripe = await getStripe();

    // API req to our own Nextjs backend
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItems),
    });

    // Server error
    if (response.statusCode === 500) return;

    const data = await response.json();
    // UI notification
    toast.loading('Redirecting...');
    // Instance of a checkout
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div
      ref={cartRef}
      className={styles['cart-wrapper']}
    >
      <div className={styles['cart-container']}>
        <button
          type='button'
          className={styles['cart-heading']}
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className={styles.heading}>Your Cart</span>
          <span className={styles['cart-num-items']}>{totalQties} products</span>
        </button>

        {cartItems.length < 1 && (
          <div className={styles['empty-cart']}>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button
                type='button'
                className={styles.btn}
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className={styles['product-container']}>
          {cartItems.length >= 1 && cartItems.map(item => (
            <div
              key={item._id}
              className={styles.product}
            >
              <img
                className={styles['cart-product-image']}
                src={urlFor(item?.image[0])}
                alt='cart product image'
              />
              <div className={styles['item-desc']}>
                <div className={`${styles.flex} ${styles.top}`}>
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className={`${styles.flex} ${styles.bottom}`}>
                  <div>
                    <p className={styles['quantity-desc']}>
                      <span
                        className={styles.minus}
                        onClick={() => toggleCartItemQty(item._id, 'dec')}
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className={styles.num}>
                        {item.quantity}
                      </span>
                      <span
                        className={styles.plus}
                        onClick={() => toggleCartItemQty(item._id, 'inc')}
                      >
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button
                    type='button'
                    className={styles['remove-item']}
                    onClick={() => onRemoveProduct(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length >= 1 && (
          <div className={styles['cart-bottom']}>
            <div className={styles.total}>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className={styles['btn-container']}>
              <button
                type='button'
                className={styles.btn}
                onClick={handleCheckout}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
