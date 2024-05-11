import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Category = ({
  onCategoryChange,
  selectedCategory,
  setShowPriceBelow,
}) => {
  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Toys",
    "Health & Beauty",
    "Computers & Accessories",
    "Furniture",
    "Automotive",
    "Garden & Tools",
    "Jewelry",
    "Watches",
    "Shoes",
    "Accessories",
    "Laptops",
    "Mobile Phones",
  ];

  const handleCategoryClick = (category) => {
    onCategoryChange(category);
    setShowPriceBelow(false); // Close the Price dropdown when category changes
  };

  const language = useSelector((state) => state.language.language);

  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="flex items-center justify-center btn bg-indigo-300 rounded-full text-gray-700 text-xl roboto px-10 h-10 w-96  text-center"
        onClick={() => setShowPriceBelow(false)}
      >
        <span className="text-4xl">
          {language === "en" ? "Category" : "ምድብ"}
        </span>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-4 shadow w-full bg-indigo-300 mt-3 rounded-2xl "
      >
        {categories.map((category) => (
          <li key={category}>
            <a
              onClick={() => handleCategoryClick(category)}
              className={`block py-2 px-4 hover:bg-gray-200 ${
                selectedCategory === category ? "font-bold" : ""
              }`}
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
