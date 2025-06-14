import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMobileOpen(false);
  };

  const navItems = [
    { path: "/", name: "Home", id: "home" },
    { path: "/products", name: "Products", id: "products" },
    { path: "/accessories", name: "Accessories", id: "accessories" },
    { path: "/about", name: "About Us", id: "about" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" onClick={() => handleLinkClick("home")}>
            <span className="logo-text">ShoeStack</span>
            <span className="logo-dot"></span>
          </Link>
        </div>

        <div className="nav-links-container">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`nav-link ${activeLink === item.id ? "active" : ""}`}
                  onClick={() => handleLinkClick(item.id)}
                >
                  {item.name}
                  <span className="link-underline"></span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button className="btn-get-started" onClick={() => handleLinkClick("get-started")}>
              Get Started <FiArrowRight className="btn-icon" />
            </button>
          </div>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;