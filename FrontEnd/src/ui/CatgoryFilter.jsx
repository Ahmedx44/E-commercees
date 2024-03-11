import { useState } from "react";
import { Select } from "flowbite-react";

const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const categories = ["All", "Electronics", "Clothing", "Home", "Garden"];

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-xs">
        <Select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default CategoryFilter;
