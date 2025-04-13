import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import Products from "./pages/Products";
// import Cart from "./pages/Cart";
// import Profile from "./pages/Profile";
import PaymentForm from "./components/PaymentForm";
import CartPage from "./components/Cart";
import ProductsPage from "./components/ProductsPage";
import { CartProvider } from './components/CartContext';
import Body from "./pages/Body";
import CheckoutPage from "./components/CheckoutPage";

function App() {
  return (
    <CartProvider>
      <Router>
  <Navbar />
  <main>
    <Routes>
      <Route path="/" element={
        <>
          <Body />
          <Footer />
        </>
      } />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment" element={<PaymentForm />} />
    </Routes>
  </main>
</Router>

    </CartProvider>
  );
  
}

export default App;
