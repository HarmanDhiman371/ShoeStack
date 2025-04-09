import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">ShoeStack</div>
      <div className="navbar-right">
        <ul className="navbar-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Products</a></li>
          <li><a href="#about">Acessories</a></li>
          <li><a href="#contact">About</a></li>
        </ul>
        <button className="navbar-btn">Get Started</button>
      </div>
    </nav>
  );
}

export default Navbar;
