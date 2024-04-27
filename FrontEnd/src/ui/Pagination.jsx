import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="join mt-10 center">
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
        className={`join-item btn`}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
