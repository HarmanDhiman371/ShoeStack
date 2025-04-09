import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './components/ProductsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
