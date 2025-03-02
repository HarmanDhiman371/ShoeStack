import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import Products from "./pages/Products";
// import Cart from "./pages/Cart";
// import Profile from "./pages/Profile";
import PaymentForm from "./components/PaymentForm";
function App() {
  // return (
  //   <Router>
  //     <Navbar />
  //     {/* <main>
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/products" element={<Products />} />
  //         <Route path="/cart" element={<Cart />} />
  //         <Route path="/profile" element={<Profile />} />
  //       </Routes>
  //     </main> */}
  //     <Footer />
  //   </Router>
  // );
  return (
    <div>
      <PaymentForm />
    </div>
  );
}

export default App;
