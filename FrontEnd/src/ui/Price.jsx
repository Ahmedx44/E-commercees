import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Price = ({ onPriceRangeChange }) => {
  const [priceRanges, setPriceRanges] = useState([
    { id: 1, label: "All ", value: [0, 1000] },
    { id: 2, label: "Above 1000ETB ", value: [1000, 5000] },
    { id: 3, label: "Above 5000ETB", value: [5000, 10000] },
    { id: 4, label: "Above 10000ETB ", value: [10000, 50000] },
    { id: 5, label: "Above 50000ETB", value: [50001, Infinity] }, // Adjusted the minimum value to start from 50001
  ]);

  const handlePriceRangeChange = (value) => {
    onPriceRangeChange(value);
  };
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);

  return (
    <div className=" p-8 ">
      <h3 className="text-3xl font-bold mb-4">
        {language === "en" ? "Price Range " : "የዋጋ ክልል"}
      </h3>
      <ul>
        {priceRanges.map((range) => (
          <li key={range.id} className="mb-4">
            <label
              htmlFor={`priceRange_${range.id}`}
              className="flex items-center cursor-pointer"
            >
              <input
                id={`priceRange_${range.id}`}
                type="radio"
                name="priceRange"
                className="rabio bg-indigo-500 mr-2"
                onChange={() => handlePriceRangeChange(range.value)}
              />
              <span className="roboto font-bold text-indigo-500">
                {range.label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Price;
