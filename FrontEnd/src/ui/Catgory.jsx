import React from "react";

const Catgory = ({ onCategoryChange, selectedCategory }) => {
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

  return (
    <div>
      <h3 className="text-xl font-bold  ">Category</h3>
      <div className="flex flex-col text-sm">
        {categories.map((category) => (
          <p
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`py-2 px-4 rounded-md cursor-pointer ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {category}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Catgory;
