import React, { useState } from 'react';
import { useCart } from './CartContext';
import "../styles/ProductList.css";

const ProductList = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleBuyNowClick = (product) => {
    setSelectedProduct(product);
    setSelectedSize('');
    setQuantity(1);
  };

  const handleBuyConfirm = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    // You can send this data to your backend or cart logic
    console.log("Purchasing:", {
      product: selectedProduct.name,
      size: selectedSize,
      quantity
    });

    const productToAdd = {
      id: selectedProduct.id,
      product: selectedProduct.name,
      size: selectedSize,
      quantity,
      price: selectedProduct.price, 
      imageUrl: selectedProduct.imageUrl,
    };
    addToCart(productToAdd);

    // Reset selection
    setSelectedProduct(null);
  };

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'}
          />
          <div className="product-info">
            <h3>{product.brand}</h3>
            <p>{product.name}</p>
            <p className="price">₹{product.price}</p>
            <button className="buy-btn" onClick={() => handleBuyNowClick(product)}>Buy Now</button>
          </div>
        </div>
      ))}

      {selectedProduct && (
        <div className="buy-now-form">
          <h3>{selectedProduct.name}</h3>
          <label>Size:</label>
          <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
            <option value="">Select Size</option>
            {selectedProduct.sizeOptions.split(',').map(size => (
              <option key={size.trim()} value={size.trim()}>{size.trim()}</option>
            ))}
          </select>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <div className="btn-group">
            <button onClick={handleBuyConfirm}>Confirm Purchase</button>
            <button onClick={() => setSelectedProduct(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
