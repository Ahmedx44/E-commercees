import React from "react";

const CategoryDropdown = () => {
  return (
    <div className="mb-4">
      <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
        Category:
      </label>
      <div className="relative">
        <select
          id="category"
          name="category"
          className="block appearance-none w-full bg-black border  text-white py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none  focus:border-gray-800"
        >
          <option value="">Select a category</option>
          <option value="Туре">Туре</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-900">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 7.995l.707.707L10 13.757z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
