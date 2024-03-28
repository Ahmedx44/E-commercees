import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";

function Price() {
  const [value, setValue] = useState("");
  return (
    <div>
      <h1 className="font-bold text-center mt-10 text-center">Price</h1>

      <Box sx={{ width: 120 }} className="ml-5 p-5">
        <p className="font-bold text-xl">{value}ETB</p>
        <Slider
          size="small"
          defaultValue={70}
          aria-label="Small"
          valueLabelDisplay="auto"
          min={1}
          max={10000}
          step={10}
          onChange={(e) => setValue(e.target.value)}
        />
      </Box>
    </div>
  );
}

export default Price;
