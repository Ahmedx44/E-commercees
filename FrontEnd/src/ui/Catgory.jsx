import React from "react";

const Category = ({ onCategoryChange, selectedCategory }) => {
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
    <div className="relative">
      <details className="dropdown">
        <summary className="m-1 btn bg-fuchsia-100 p-4 rounded-full w-3/4 roboto text-gray">
          Category
        </summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-3/4  bg-fuchsia-100 mt-3 rounded-2xl">
          {categories.map((category) => (
            <li key={category}>
              <a
                onClick={() => onCategoryChange(category)}
                className={`block py-2 px-4 hover:bg-gray-200 ${
                  selectedCategory === category ? "font-bold" : ""
                }`}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
};

export default Category;
