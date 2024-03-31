import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex items-center justify-center space-x-2 mt-10 mr-36">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-md ${
          currentPage === 1
            ? "bg-gray-200 text-black cursor-not-allowed font-bold"
            : "bg-blue-500 text-white"
        } hover:bg-black focus:outline-none focus:bg-blue-600 transition duration-200 hover:text-white`}
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-2 rounded-md ${
            number === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-200`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-200 text-black font-bold cursor-not-allowed"
            : "bg-blue-500 text-white"
        } hover:bg-black focus:outline-none focus:bg-blue-600 transition duration-200 hover:text-white`}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
