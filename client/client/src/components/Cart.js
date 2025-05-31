import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';   // <--- Import toast

import '../styles/Cart.css';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const navigate=useNavigate();
  const handleCheckout = () => {
    navigate('/checkout');
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
              <div className="item-image">
                <img src={item.imageUrl} alt={item.product} />
              </div>
              <div className="item-details">
                <h4>{item.product}</h4>
                <p>Price: ₹{item.price}</p>
                <p>Subtotal: ₹{item.price * item.quantity}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => updateQuantity(item.id, 'dec')}>-</button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => {
                    if (item.quantity < 15) {
                      updateQuantity(item.id, 'inc');
                      toast.success('Quantity increased');
                    } else {
                      toast.warn('Maximum quantity of 15 reached');
                    }
                  }}
                >
                  +
                </button>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="total">Total: ₹{calculateTotal()}</div>
          <button className="gradient-btn checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;