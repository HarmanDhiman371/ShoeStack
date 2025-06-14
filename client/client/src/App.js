import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PaymentForm from "./components/PaymentForm";
import CartPage from "./components/Cart";
import ProductsPage from "./components/ProductsPage";
import { CartProvider } from './components/CartContext';
import Body from "./pages/Body";
import CheckoutPage from "./components/CheckoutPage";
import About from "./pages/About";
import LoginPage from "./pages/loginpage"; 
import SignupPage from './pages/SignupPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          theme="dark" 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover
        />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Body />
               
                <Footer />
                
              </>
            } />
           <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment" element={<PaymentForm />} />
            <Route path="/about" element={<About />} />
            
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;