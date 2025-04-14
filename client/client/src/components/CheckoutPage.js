import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePayment = () => {
    
    navigate("/payment");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout🛍️</h2>
      
      <div className="checkout-form">
        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} />
        <input type="text" name="zip" placeholder="ZIP Code" value={form.zip} onChange={handleChange} />
      </div>

      <h3>Order Summary</h3>
      <table className="checkout-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Size</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.product}</td>
              <td>{item.size}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>₹{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="checkout-total">
        <strong>Total: ₹{calculateTotal()}</strong>
      </div>

      <button className="payment-btn" onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
};

export default CheckoutPage;
