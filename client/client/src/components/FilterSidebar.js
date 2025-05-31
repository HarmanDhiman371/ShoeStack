import React from 'react';
import "../styles/FilterSlider.css";

const FilterSidebar = ({ filters, onFilterChange, onClear }) => {
  const brands = ['Nike', 'Puma', 'Red Tape', 'HRX'];
  const genders = ['male', 'female'];
  const sizes = ['6', '7', '8', '9', '10'];
  const colors = ['black', 'white', 'red', 'blue', 'green'];

  const renderCheckboxList = (label, items, category) => (
    <div className="filter-group">
      <h4>{label}</h4>
      {items.map(item => (
        <label key={item}>
          <input
            type="checkbox"
            checked={filters[category].includes(item)}
            onChange={() => onFilterChange(category, item)}
          />
          {item}
        </label>
      ))}
    </div>
  );

  return (
    <aside className="filter-sidebar">
      <h3>FILTERS</h3>
      {renderCheckboxList('Brand', brands, 'brand')}
      {renderCheckboxList('Gender', genders, 'gender')}
      {renderCheckboxList('Size', sizes, 'size')}
      {renderCheckboxList('Color', colors, 'color')}

      <button onClick={onClear} className="clear-btn">
        Clear All Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;