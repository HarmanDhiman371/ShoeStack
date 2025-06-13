import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "./CartContext";
import './Navbar.css';

const Navbar = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? 'auto' : 'hidden';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate('/')}>
          <span className="logo-primary">Shoe</span>
          <span className="logo-secondary">Stack</span>
        </div>

        <div className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          <ul className="nav-menu">
            <li>
              <Link to="/" className="nav-link" onClick={closeMobileMenu}>Home</Link>
            </li>
            <li>
              <Link to="/products" className="nav-link" onClick={closeMobileMenu}>Products</Link>
            </li>
            <li>
              <Link to="/accessories" className="nav-link" onClick={closeMobileMenu}>Accessories</Link>
            </li>
            <li>
              <Link to="/about" className="nav-link" onClick={closeMobileMenu}>About</Link>
            </li>
            <li className="nav-cart">
              <Link to="/cart" className="nav-link" onClick={closeMobileMenu}>
                <FaShoppingCart />
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </Link>
            </li>
          </ul>
          <button className="nav-button" onClick={() => { navigate('/signup'); closeMobileMenu(); }}>
            Get Started
          </button>
        </div>

        <button 
          className="mobile-toggle" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;