import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Price = ({ onPriceRangeChange }) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const priceRanges = [
    { id: 1, label: "All ", value: [0, 1000] },
    { id: 2, label: "Above 1000ETB ", value: [1000, 5000] },
    { id: 3, label: "Above 5000ETB", value: [5000, 10000] },
    { id: 4, label: "Above 10000ETB ", value: [10000, 50000] },
    { id: 5, label: "Above 50000ETB", value: [50001, Infinity] }, // Adjusted the minimum value to start from 50001
  ];

  const handlePriceRangeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedPriceRange(selectedValue);
    const selectedRange = priceRanges.find(
      (range) => range.label === selectedValue
    );
    onPriceRangeChange(selectedRange.value);
  };

  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);

  return (
    <div className="p-8">
      <select
        className="border border-gray-300  bg-indigo-300  font-bold rounded-full"
        value={selectedPriceRange}
        onChange={handlePriceRangeChange}
      >
        <option value="">
          {language === "en" ? "Select Price Range" : "የዋጋ ክልል ምረጥ"}
        </option>
        {priceRanges.map((range) => (
          <option key={range.id} value={range.label}>
            {range.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Price;
