import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} E-Shop. All Rights Reserved.</p>
      <ul>
        <li><a href="/terms">Terms & Conditions</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
      </ul>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background: #222;
  color: #fff;
  text-align: center;
  padding: 20px 0;
  position: absolute;
  width: 100%;
  bottom: 0;

  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 10px;
  }

  ul li a {
    color: #f8b400;
    text-decoration: none;
  }

  ul li a:hover {
    text-decoration: underline;
  }
`;
