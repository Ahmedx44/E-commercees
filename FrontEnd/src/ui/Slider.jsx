import React from "react";
import NoUiSlider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

const Slider = ({ min, max, step, onRangeChange }) => {
  const handleRangeChange = (values, handle) => {
    onRangeChange(values);
  };

  return (
    <NoUiSlider
      range={{ min, max }}
      step={step}
      start={[min, max]}
      connect
      onSlide={handleRangeChange}
      tooltips={[true, true]}
      format={wNumb({ decimals: 2 })}
      pips={{ mode: "steps", stepped: true, density: 4 }}
      style={{ margin: "0 auto 1rem" }}
    />
  );
};

export default Slider;
