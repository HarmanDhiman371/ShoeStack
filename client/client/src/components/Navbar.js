import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import styled from "styled-components";
import { useCart } from "./CartContext"; // Make sure the path is correct
import './Navbar.css';

const Navbar = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // For conditional rendering, you would likely want to check if the user is logged in
  const isLoggedIn = localStorage.getItem('token');  // Check if JWT token exists in localStorage
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">ShoeStack</div>
      <div className="navbar-right">
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/accessories">Accessories</Link></li>
          <li><Link to="/about">About</Link></li>

          <li>
            <Link to="/cart" className="cart-link">
              <FaShoppingCart />
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </Link>
          </li>

          {/* Conditionally render Login/Signup or Profile and Logout */}
          {!isLoggedIn ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/profile"><FaUser /> Profile</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </>
          )}
        </ul>
        <button className="navbar-btn">Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;
