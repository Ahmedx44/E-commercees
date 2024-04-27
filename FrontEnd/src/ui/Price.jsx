import React from "react";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

const Price = ({ onPriceRangeChange }) => {
  const handleChange = (newValue) => {
    onPriceRangeChange(newValue);
  };

  return (
    <div className="mt-4 w-48">
      <h3 className="text-lg font-semibold mb-2">Price Range</h3>
      <RangeSlider
        min={0}
        max={1000}
        defaultValue={[0, 1000]}
        step={1}
        onChange={handleChange}
        colorScheme="pink"
        aria-label="Price Range"
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </div>
  );
};

export default Price;
