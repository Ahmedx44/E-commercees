import React from "react";

function RatingFilter({ onRatingChange }) {
  const handleRatingChange = (e) => {
    const selectedRating = e.target.value;
    onRatingChange(selectedRating);
  };

  return (
    <div className="flex items-center mb-4">
      <label className="block mr-2">Rating Filter:</label>
      <select
        onChange={handleRatingChange}
        className="border rounded-md py-1 px-2 bg-black text-white"
      >
        <option value="" className="text-white">
          All
        </option>
        <option value="5">5 stars</option>
        <option value="4">4 stars</option>
        <option value="3">3 stars</option>
        <option value="2">2 stars</option>
        <option value="1">1 star</option>
      </select>
    </div>
  );
}

export default RatingFilter;
