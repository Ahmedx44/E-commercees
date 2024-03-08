import { useState } from "react";

function PriceFilter() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    if (name === "minPrice") {
      setMinPrice(value);
    } else if (name === "maxPrice") {
      setMaxPrice(value);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="minPrice">Min Price:</label>
      <input
        type="range"
        name="minPrice"
        id="minPrice"
        min="0"
        max="10000"
        step="1"
        value={minPrice}
        onChange={handlePriceChange}
        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <span className="text-lg font-medium">${minPrice}</span>

      <label htmlFor="maxPrice">Max Price:</label>
      <input
        type="range"
        name="maxPrice"
        id="maxPrice"
        min="0"
        max="10000"
        step="1"
        value={maxPrice}
        onChange={handlePriceChange}
        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <span className="text-lg font-medium">${maxPrice}</span>
    </div>
  );
}

export default PriceFilter;
