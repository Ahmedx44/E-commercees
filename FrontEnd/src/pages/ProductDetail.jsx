import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "./../store";
import Spinner from "../ui/Spinner";
import axios from "axios";
import { FaPerson } from "react-icons/fa6";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Badge,
} from "@material-tailwind/react";
import { Rating } from "flowbite-react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setName(decodedToken.userName);
      console.log(decodedToken);
    }
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/api/products/${id}`
        );
        setProduct(response.data.data);
        const reviewsResponse = await axios.get(
          `http://127.0.0.1:4000/api/products/${id}/reviews`
        );
        setReviews(reviewsResponse.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        // Handle error
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      console.log("Adding to cart:", product);
      dispatch(addToCart(product));
    }
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://127.0.0.1:4000/api/products/${id}/reviews`, {
        rating,
        comment,
        name,
      });
      toast.success("Successfully added");
      // Optionally, you can refresh the product detail page to reflect the updated reviews/ratings
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
      <div className="bg-indigo-400 p-20 mt-24 text-center text-white font-bold roboto ">
        <h1 className="text-4xl font-bold text-white mb-3 ">
          {language === "en" ? "Product Detail" : "የምርት ዝርዝር"}
        </h1>
        <p>
          {" "}
          {language === "en" ? "Home | Product Detail" : "መነሻ | የምርት ዝርዝር"}
        </p>
      </div>
      <div className="mb-30 bg-gray-100">
        <div className="w-3/4 width relative top-9 left-96 flex justify-between justify-center rounded-lg">
          <div className="flex items-center ">
            {product ? (
              <>
                <img
                  src={product.image}
                  alt=""
                  className="w-96 heightimg object-center mr-9 p-7 pl-24"
                />
                <div className="text-black bold text-4xl">
                  <h2 className="text-3xl font-bold roboto text-indigo-800 ">
                    {product.name.charAt(0).toUpperCase() +
                      product.name.slice(1)}
                  </h2>
                  <p className="text-2xl font-bold my-5 ">
                    {" "}
                    {language === "en" ? " Catgory:" : "ምድብ፡"}
                    <span className="text-indigo-800 text-lg">
                      {product.category}
                    </span>
                  </p>
                  <Rating>
                    <Rating.Star />
                    <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                      {product.rating}
                    </p>
                    <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                    >
                      {reviews.length}{" "}
                      {language === "en" ? "reviews :" : "ግምገማዎች"}
                    </a>
                  </Rating>
                  <div className="flex gap-2 text-2xl font-bold mt-5">
                    <p className="font-bold roboto">
                      {" "}
                      {language === "en" ? "Available:" : "ይገኛል፡"}
                    </p>
                    {product.quantity === 0 ? (
                      <Badge color="red">
                        {" "}
                        {language === "en" ? "Out of Stock " : "ከመጋዘን ተጠናቀቀ"}
                      </Badge>
                    ) : (
                      <p className="text-indigo-800">{product.quantity}</p>
                    )}
                  </div>
                  <button
                    onClick={handleAddToCart}
                    disabled={product.quantity === 0}
                    className="text-2xl roboto p-3 bg-indigo-400 text-black rounded-xl transition duration-300 delay-100 mt-10 hover:bg-gray-700 text-white"
                  >
                    {" "}
                    {language === "en" ? " Add to Cart" : "ወደ ግዢው ቅርጫት ጨምር"}
                  </button>
                </div>
              </>
            ) : (
              <Spinner className="" />
            )}
          </div>
        </div>
      </div>
      <div className="mt-10 bg-gray-100">
        <Card className="mb-20 w-11/12 m-auto">
          <CardHeader color="blue" contentPosition="none">
            <div className="bg-indigo-400 text-white rounded-t-lg py-2 shadow-xl">
              <h2 className="text-2xl font-bold pl-3 roboto">
                {language === "en" ? "Product Information" : "የምርት መረጃ"}
              </h2>
            </div>
          </CardHeader>
          <CardBody>
            <Typography color="gray" className="text-xl font-semibold roboto">
              {product ? product.description : ""}
            </Typography>
          </CardBody>
        </Card>
        <Card className="w-11/12 m-auto mt-10 mb-10">
          <CardHeader color="green" contentPosition="none">
            <div className="bg-indigo-400 text-white rounded-t-lg py-2">
              <h2 className="text-2xl font-bold pl-3 roboto">
                {" "}
                {language === "en" ? "Product Reviews" : "የምርት ግምገማዎች"}
              </h2>
            </div>
          </CardHeader>
          <CardBody>
            <div className="bg-gray-100 rounded-lg p-4 shadow-md">
              <div className="flex justify-center p-4"></div>
              <div className="px-4 pb-4">
                <form onSubmit={handleSubmitReview}>
                  <div className="mt-4">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="border roboto border-gray-300 rounded-lg bg-white h-32 focus:outline-none focus:border-blue-300 p-2 resize-none w-full"
                      placeholder={
                        language === "en" ? "Leave a review" : "ግምገማ ይተዉ"
                      }
                    />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      type="submit"
                      className="w-32 bg-indigo-600 hover:bg-indigo-400"
                    >
                      {language === "en" ? " Submit Review " : "ግምገማ አስገባ"}
                    </Button>
                  </div>
                </form>
                <hr className="mt-5 w-1/2 m-auto text-black h-5" />
                <div className="mt-8">
                  {reviews.map((review) => (
                    <div key={review._id} className="mb-4">
                      <Typography
                        variant="h6"
                        color="gray"
                        className="mb-2 roboto text-xl flex"
                      >
                        <FaPerson className="text-2xl" /> {review.name}
                      </Typography>
                      <div className="flex items-center mb-2">
                        <Rating>
                          <Rating.Star />
                        </Rating>
                        <Typography
                          variant="body2"
                          color="gray"
                          className="ml-2 text-xl font-bold"
                        >
                          {review.rating} / 5
                        </Typography>
                      </div>
                      <Typography
                        variant="body2"
                        color="gray"
                        className="text-xl"
                      >
                        {review.comment}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ProductDetail;
