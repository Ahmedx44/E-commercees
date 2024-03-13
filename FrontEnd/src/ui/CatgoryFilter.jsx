import React from "react";

function CategoryFilter({ onCategoryChange }) {
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    onCategoryChange(selectedCategory);
  };

  return (
    <div className="flex items-center mb-4">
      <label className="block mr-2">Category Filter:</label>
      <select
        onChange={handleCategoryChange}
        className="border rounded-md py-1 px-2 bg-black text-white"
      >
        <option value="">All</option>
        <option value="react">React</option>
        <option value="angular">Angular</option>
        <option value="vue">Vue</option>
      </select>
    </div>
  );
}

export default CategoryFilter;
