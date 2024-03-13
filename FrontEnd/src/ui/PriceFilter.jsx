function PriceFilter({ onPriceChange }) {
  const handlePriceChange = (e) => {
    const selectedPrice = e.target.value;
    onPriceChange(selectedPrice);
  };

  return (
    <div className="mb-4 flex">
      <label className="block mb-2 mt-0 mt-0 ml-7">Price Filter:</label>
      <select
        onChange={handlePriceChange}
        className="border rounded-md h-[30px] ml-7 bg-black text-white font-semibold mt-0"
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
