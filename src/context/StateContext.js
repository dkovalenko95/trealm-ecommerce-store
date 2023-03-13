import React, { useState, useEffect, useContext, createContext } from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setshowCart] = useState(false);
  const [cartItems, setcartItems] = useState();
  const [totalPrice, settotalPrice] = useState();
  const [totalQties, setTotalQties] = useState();
  const [qty, seQty] = useState(1);

  const incQty = () => {
    seQty(prevQty => {
      return prevQty + 1;
    });
  };

  const decQty = () => {
    seQty(prevQty => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQties,
        qty,
        incQty,
        decQty,
      }}>
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
