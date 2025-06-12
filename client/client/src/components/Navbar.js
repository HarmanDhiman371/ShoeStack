import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "./CartContext";
import './Navbar.css';

const Navbar = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">ShoeStack</div>
      
      <div className={`navbar-right ${isMobileMenuOpen ? "active" : ""}`}>
        <ul className="navbar-menu">
          <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
          <li><Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Products</Link></li>
          <li><Link to="/accessories" onClick={() => setIsMobileMenuOpen(false)}>Accessories</Link></li>
          <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>

          <li>
            <Link to="/cart" className="cart-link" onClick={() => setIsMobileMenuOpen(false)}>
              <FaShoppingCart />
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </Link>
          </li>
        </ul>
        <button className="navbar-btn" onClick={handleGetStarted}>Get Started</button>
      </div>

      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;