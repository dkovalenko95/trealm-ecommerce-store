import React, { useRef } from 'react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { urlFor } from '../lib/client';
import { useStateContext } from '../context/StateContext';

import getStripe from '../lib/getStripe';

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
      className='cart-wrapper'
    >
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>{totalQties} products</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href='/'>
              <button
                type='button'
                className='btn'
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map(item => (
            <div
              key={item._id}
              className='product'
            >
              <img
                className='cart-product-image'
                src={urlFor(item?.image[0])}
              />
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                      <span
                        className='minus'
                        onClick={() => toggleCartItemQty(item._id, 'dec')}
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className='num'>
                        {item.quantity}
                      </span>
                      <span
                        className='plus'
                        onClick={() => toggleCartItemQty(item._id, 'inc')}
                      >
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button
                    type='button'
                    className='remove-item'
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
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button
                type='button'
                className='btn'
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
