function CategoryFilter({ categories, onCategoryChange }) {
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    onCategoryChange(selectedCategory);
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 ml-7">Category Filter:</label>
      <select
        onChange={handleCategoryChange}
        className="border rounded-md py-1 px-2 ml-7"
      >
        <option value="">All</option>
        {(category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        )}
      </select>
    </div>
  );
}

export default CategoryFilter;
