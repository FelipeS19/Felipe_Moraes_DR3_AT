import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.valor * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, getTotal, setCartItems  }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
