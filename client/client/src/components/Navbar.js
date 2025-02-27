import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import styled from "styled-components";

const Navbar = () => {
  return (
    <NavContainer>
      <div className="logo">
        <Link to="/">E-Shop</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/cart"><FaShoppingCart /> Cart</Link></li>
        <li><Link to="/profile"><FaUser /> Profile</Link></li>
      </ul>
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background: #222;
  color: #fff;

  .logo a {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
  }

  .nav-links {
    list-style: none;
    display: flex;
    gap: 20px;
  }

  .nav-links li {
    display: flex;
    align-items: center;
  }

  .nav-links a {
    color: #fff;
    text-decoration: none;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .nav-links a:hover {
    color: #f8b400;
  }
`;
