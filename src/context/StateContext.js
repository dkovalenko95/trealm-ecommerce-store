import React, { useState, useEffect, useContext, createContext } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQties, setTotalQties] = useState(0);
  const [qty, setQty] = useState(1);

  // Variables for Cart qty toggle
  let foundProduct; // -> item want to update
  let indexProp; // -> index of item want ot update in cartItems

  // Inc/dec prod inside ProductDetails
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
            quantity: cartProd.quantity + quantity
          }
        };
      });

      setCartItems(updatedItems);
    } else {
      product.quantity = quantity;
      // console.log([ ...cartItems, { ...product }]);
      setCartItems([...cartItems, { ...product }]);
    };

    toast.success(`${qty} ${product.name} added to the cart!`);
  };

  // Toggle prod qty inside the Cart
  const toggleCartItemQty = (id, value) => {
    foundProduct = cartItems.find(item => item._id === id); // -> prod want to update
    indexProp = cartItems.findIndex(product => product._id === id); // -> index of prod want ot update
    const filteredCartItems = cartItems.filter(item => item._id !== id); // -> prods NOT want to update

    // console.log(filteredCartItems);
    // console.log(foundProduct);
    // console.log(indexProp);

    // Inc/dec def acts
    if (value === 'inc') {
      setCartItems([
        ...filteredCartItems,
        { 
          ...foundProduct,
          quantity: foundProduct.quantity + 1,
        }
      ]);
      setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price);
      setTotalQties(prevTotalQties => prevTotalQties + 1);

    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...filteredCartItems,
          {
            ...foundProduct,
            quantity: foundProduct.quantity - 1,
          }
        ]);
        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price);
        setTotalQties(prevTotalQties => prevTotalQties - 1);
      }
    };
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQties,
        qty,
        setQty,
        incQty,
        decQty,
        onAddProduct,
        toggleCartItemQty,
      }}>
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
