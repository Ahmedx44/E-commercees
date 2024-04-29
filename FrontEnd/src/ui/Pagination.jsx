import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="join ml-96 mt-20">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`join-item btn`}
      >
        «
      </button>
      <button className={`join-item btn`}>Page {currentPage}</button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`join-item btn bg-indigo-200`}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
