import React from 'react';
import { useCart } from './CartContext';
import '../styles/Cart.css';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>Price: ₹{item.price}</p>
                <p>Subtotal: ₹{item.price * item.quantity}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item.id, 'dec')}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 'inc')}>+</button>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="total">Total: ₹{calculateTotal()}</div>
        </>
      )}
    </div>
  );
};

export default CartPage;
