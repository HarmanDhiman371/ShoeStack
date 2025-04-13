import React from 'react';
import { useCart } from './CartContext';

const ProductPage = () => {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: 'Product A', price: 199 },
    { id: 2, name: 'Product B', price: 299 },
  ];

  const handleAddToCart = (product) => {
    addToCart(product); // ✅ Add to cart only
    // alert(`${product.name} added to cart!`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Our Products</h2>
      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: '20px' }}>
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price}</p>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}    </div>
  );
};

export default ProductPage;
