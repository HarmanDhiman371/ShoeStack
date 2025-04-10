import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import styled from "styled-components";
import { useCart } from "./CartContext"; // Make sure the path is correct
import './Navbar.css';
const Navbar = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (

      // <div className="logo">
      //   <Link to="/">ShoeStack</Link>
      // </div>

      // <ul className="nav-links">
      //   <li><Link to="/">Home</Link></li>
      //   <li><Link to="/products">Products</Link></li>
      //   <li><Link to="/accessories">Accessories</Link></li>
      //   <li><Link to="/about">About</Link></li>
      //   <li><Link to="/cart" className="cart-link">
      //     <FaShoppingCart />
      //     Cart
      //     {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
      //   </Link></li>
      //   <li><Link to="/profile"><FaUser /> Profile</Link></li>
      // </ul>

      // <button className="navbar-btn">Get Started</button>
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
        </ul>
        <button className="navbar-btn">Get Started</button>
      </div>
    </nav>

  );
};

export default Navbar;


