import { useState, useContext, createContext } from 'react';
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
  let indexProp;

  // Inc/dec prod inside ProductDetails - [slug.js]
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
      setCartItems([...cartItems, { ...product }]);
    };

    toast.success(`${qty} ${product.name} added to the cart!`);
  };

  const onRemoveProduct = product => {
    foundProduct = cartItems.find(item => item._id === product._id); // -> prod want to remove
    const newCartItems = cartItems.filter(item => item._id !== product._id); // -> prods NOT want to remove

    setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQties(prevTotalQties => prevTotalQties - foundProduct.quantity);
    setCartItems(newCartItems);
  };

  // Toggle prod qty inside the Cart
  const toggleCartItemQty = (id, type) => {
    foundProduct = cartItems.find(item => item._id === id); // -> prod want to update
    indexProp = cartItems.findIndex(product => product._id === id); // -> index of prod want ot update

    // Inc/dec def acts
    if (type === 'inc') {

      // Solution that preserves order of items in list, when inc/dec
      setCartItems(prevCartItems => (

        // Go through arr to find clicked item
        prevCartItems.map(item => {

          // Define selected clicked item
          if (item._id === id) {
            return {
              ...item,
              quantity: foundProduct.quantity + 1,
            }; // -> change qty of selected item
          } else {
            return item;
          }; // -> other not selected items remains the same
        })
      )); // -> new prods []: filtered not updated prods + actual selected updated qty prod

      setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price);
      setTotalQties(prevTotalQties => prevTotalQties + 1);

    } else if (type === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems(prevCartItems => (
          prevCartItems.map(item => {
            if (item._id === id) {
              return {
                ...item,
                quantity: foundProduct.quantity - 1,
              };
            } else {
              return item;
            };
          })
        ));

        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price);
        setTotalQties(prevTotalQties => prevTotalQties - 1);
      };
    };
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQties,
        setTotalQties,
        qty,
        setQty,
        incQty,
        decQty,
        onAddProduct,
        toggleCartItemQty,
        onRemoveProduct,
      }}>
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
