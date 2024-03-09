function RatingFilter({ onRatingChange }) {
  const handleRatingChange = (e) => {
    const selectedRating = e.target.value;
    onRatingChange(selectedRating);
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 ml-7">Rating Filter:</label>
      <select
        onChange={handleRatingChange}
        className="border rounded-md py-1 px-2 ml-7"
      >
        <option value="">All</option>
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
