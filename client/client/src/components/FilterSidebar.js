import React from 'react';

const FilterSidebar = ({ filters, onFilterChange, onClear }) => {
  const brands = ['Nike', 'Puma', 'Red Tape', 'HRX'];
  const genders = ['male', 'female'];
  const sizes = ['6', '7', '8', '9', '10'];
  const colors = ['black', 'white', 'red', 'blue', 'green'];

  const renderCheckboxList = (label, items, category) => (
    <div className="mb-4">
      <h4 className="font-semibold mb-2">{label}</h4>
      {items.map(item => (
        <label key={item} className="block text-sm">
          <input
            type="checkbox"
            checked={filters[category].includes(item)}
            onChange={() => onFilterChange(category, item)}
            className="mr-2"
          />
          {item}
        </label>
      ))}
    </div>
  );

  return (
    <div>
      <h3 className="font-bold text-lg mb-4">FILTERS</h3>
      {renderCheckboxList('Brand', brands, 'brand')}
      {renderCheckboxList('Gender', genders, 'gender')}
      {renderCheckboxList('Size', sizes, 'size')}
      {renderCheckboxList('Color', colors, 'color')}

      <button
        onClick={onClear}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
