import React, { useState, useEffect, useContext, createContext } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [totalQties, setTotalQties] = useState();
  const [qty, setQty] = useState(1);

  const incQty = () => {
    setQty(prevQty => {
      return prevQty + 1;
    });
  };

  const decQty = () => {
    setQty(prevQty => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  const onAddProduct = (product, quantity) => {
    const checkProductInCart = cartItems.find(item => item._id === product._id);
    setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity);
    setTotalQties(prevTotalQties => prevTotalQties + quantity);

    if (checkProductInCart) {
      const updatedItems = cartItems.map(cartProd => {
        if (cartProd._id === product._id) {
          return {
            ...cartProd,
            quantity: cartProd.quantity,
          }
        };
      });

      setCartItems(updatedItems);
    } else {
      // console.log([ ...cartItems, { ...product }]);
      setCartItems([...cartItems, { ...product }]);
      product.quantity = quantity;
    };

    toast.success(`${qty} ${product.name} added to the cart!`);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQties,
        qty,
        setQty,
        incQty,
        decQty,
        onAddProduct,
      }}>
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
