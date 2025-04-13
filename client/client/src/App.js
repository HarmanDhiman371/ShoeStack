import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PaymentForm from "./components/PaymentForm";
import CartPage from "./components/Cart";
import ProductsPage from "./components/ProductsPage";
import { CartProvider } from './components/CartContext';
import Body from "./pages/Body";

import LoginPage from "./pages/loginpage"; 
=======


function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} /> {/* Login route */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentForm />} />
          </Routes>
</main>
        

  

        <Body />
        <Footer/>

      </Router>
    </CartProvider>
  );
}

export default App;
