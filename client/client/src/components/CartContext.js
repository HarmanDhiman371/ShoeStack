import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Load cart from localStorage initially
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
  const existing = cartItems.find(
    (item) => item.id === product.id && item.size === product.size
  );

  if (existing) {
    if (existing.quantity + quantity > 15) {
      toast.error("You cannot add more than 15 of the same item.");
      return false;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === product.id && item.size === product.size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    );
  } else {
    if (quantity > 15) {
      toast.error("You cannot add more than 15 of the same item.");
      return false;
    }
    setCartItems([...cartItems, { ...product, quantity }]);
    return true;
  }
};




  const updateQuantity = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === 'inc'
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  // Remove item from cart completely
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};