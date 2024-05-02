import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function ProductReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://127.0.0.1:4000/api/products/${id}/reviews`
        );
        setReviews(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        // Handle error
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="flex justify-between p-16">
        <h1 className="text-3xl font-bold mr-10">Reviews</h1>
        <Link
          to="/retailer/products"
          className="bg-indigo-400 py-1 px-5 rounded-xl text-white font-bold hover:bg-indigo-600"
        >
          Back
        </Link>
      </div>
      <div className="flex ml-32">
        {loading ? (
          <p className="text-center text-xl font-bold text-gray-800">
            Loading reviews...
          </p>
        ) : reviews.length > 0 ? (
          <ul className="divide-y divide-gray-200 w-full max-w-2xl">
            {reviews.map((review, index) => (
              <li
                key={index}
                className="py-10 border-b border-gray-200 last:border-b-0 last:border-transparent"
              >
                <div className="flex space-x-4 items-center">
                  <div className="flex-shrink-0">
                    <img
                      src="https://api.dicebear.com/5.x/initials/svg?seed={review.name}"
                      alt={review.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-900">
                      {review.name}
                    </p>
                    <div className="text-base text-gray-600 mt-2">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5 mr-1"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.814l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-bold text-xl">
                          {review.rating}
                        </span>
                      </div>
                      <p className="mt-2 text-2xl font-bold ">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg font-semibold text-gray-800">
            No reviews found for this product.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductReview;
