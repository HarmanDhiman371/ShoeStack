import React from 'react';
import '../styles/Footer.css'; // Ensure you have the correct path to your CSS file

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-about">
          <h2>StepUp Shoes</h2>
          <p>Where comfort meets style. Discover top-quality footwear crafted for every step of your journey.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Men</a></li>
            <li><a href="#">Women</a></li>
            <li><a href="#">Sports</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: hello@stepupshoes.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Fashion Street, NY</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 StepUp Shoes. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
