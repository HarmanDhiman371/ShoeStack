import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterSidebar from './FilterSidebar';
import ProductList from './ProductList';
import '../styles/ProductsPage.css'; // New CSS file

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    brand: [],
    gender: [],
    size: [],
    color: [],
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredProducts = products.filter(product => {
    const brandMatch = filters.brand.length === 0 || filters.brand.includes(product.brand);
    const genderMatch = filters.gender.length === 0 || filters.gender.includes(product.gender);
    const sizeMatch = filters.size.length === 0 || product.sizeOptions.split(',').some(size => filters.size.includes(size.trim()));
    const colorMatch = filters.color.length === 0 || filters.color.includes(product.color);
    return brandMatch && genderMatch && sizeMatch && colorMatch;
  });

  const handleFilterChange = (category, value) => {
    setFilters(prev => {
      const values = prev[category];
      const newValues = values.includes(value)
        ? values.filter(v => v !== value)
        : [...values, value];
      return { ...prev, [category]: newValues };
    });
  };

  const handleDropdownChange = (category, value) => {
    setFilters(prev => ({ ...prev, [category]: value ? [value] : [] }));
  };

  const handleClearFilters = () => {
    setFilters({ brand: [], gender: [], size: [], color: [] });
  };

  return (
    <div className="products-page">
      <aside className="sidebar">
        <h3>FILTERS</h3>

        <div>
          <strong>Brand</strong><br />
          {["Nike", "Puma", "Adidas", "Skechers", "Reebok"].map(brand => (
            <label key={brand}>
              <input
                type="checkbox"
                checked={filters.brand.includes(brand)}
                onChange={() => handleFilterChange('brand', brand)}
              /> {brand}
            </label>
          ))}
        </div>

        <div>
          <strong>Gender</strong><br />
          {["male", "female", "unisex"].map(gender => (
            <label key={gender}>
              <input
                type="checkbox"
                checked={filters.gender.includes(gender)}
                onChange={() => handleFilterChange('gender', gender)}
              /> {gender}
            </label>
          ))}
        </div>

        <div>
          <strong>Size</strong><br />
          <select onChange={(e) => handleDropdownChange('size', e.target.value)}>
            <option value="">All Sizes</option>
            {[6, 7, 8, 9, 10].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        <div>
          <strong>Color</strong><br />
          <select onChange={(e) => handleDropdownChange('color', e.target.value)}>
            <option value="">All Colors</option>
            {["Black", "White", "Red", "Blue", "Green", "Cream"].map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>

        <button onClick={handleClearFilters}>Clear All Filters</button>
      </aside>

      <main className="product-section">
        <h2>{filteredProducts.length} product{filteredProducts.length !== 1 && 's'} found</h2>
        <ProductList products={filteredProducts} />
      </main>
    </div>
  );
};

export default ProductsPage;
