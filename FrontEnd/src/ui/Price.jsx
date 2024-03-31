import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Price = ({ onPriceRangeChange }) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
    onPriceRangeChange(`${value[0]}-${value[1]}`);
  };

  return (
    <div className="mt-4 w-48">
      {" "}
      {/* Adjust width here */}
      <h3 className="text-lg font-semibold mb-2">Price Range</h3>
      <div className="relative">
        <Slider
          range
          defaultValue={priceRange}
          min={0}
          max={1000}
          onAfterChange={handlePriceRangeChange}
          marks={{ 0: "", 1000: "" }}
          trackStyle={{ backgroundColor: "#CBD5E0", height: "4px" }}
          handleStyle={{
            backgroundColor: "#4299E1",
            width: "12px",
            height: "12px",
            border: "none",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
            marginTop: "-4px",
          }}
          railStyle={{ backgroundColor: "#CBD5E0", height: "4px" }}
        />
        <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-sm text-gray-600 font-bold">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default Price;
