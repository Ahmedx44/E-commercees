function PriceFilter({ onPriceChange }) {
  const handlePriceChange = (e) => {
    const selectedPrice = e.target.value;
    onPriceChange(selectedPrice);
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 mt-32 ml-7">Price Filter:</label>
      <select
        onChange={handlePriceChange}
        className="border rounded-md py-1 px-2 ml-7"
      >
        <option value="">All</option>
        <option value="0-50">$0 - $50</option>
        <option value="51-100">$51 - $100</option>
        <option value="101-200">$101 - $200</option>
        {/* Add more options as needed */}
      </select>
    </div>
  );
}

export default PriceFilter;
