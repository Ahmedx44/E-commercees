import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "./../store";
import Spinner from "../ui/Spinner";

import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Rating,
  Button,
} from "@material-tailwind/react";
import Tabss from "../ui/Tabs";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/api/products/${id}`
        );
        setProduct(response.data.data);
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

  const ProductRatingForm = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      // submit rating and comment to server here
    };

    return (
      <>
        <div className="bg-black p-20 mt-24 text-center text-white font-bold ">
          <h1 className="text-4xl font-bold text-white mb-3 ">
            Product Detail
          </h1>
          <p>Home | Product Detail</p>
        </div>

        <div className="mb-30">
          <div className="w-3/4 width  rounded-lg relative top-9 left-96 flex justify-between justify-center rounded-lg">
            <div className="flex items-center ">
              {product ? (
                <>
                  <img
                    src={product.image}
                    alt=""
                    className="w-96 heightimg object-center mr-9 p-7  pl-24"
                  />
                  <div className="text-black bold text-5xl">
                    <h2 className="text-5xl font-bold p-5">
                      {product.name.charAt(0).toUpperCase() +
                        product.name.slice(1)}
                    </h2>
                    <p className="text-xl pl-6">By: Ahmed</p>

                    <div className="flex">
                      <Rating
                        name="read-only"
                        value={product.rating}
                        readOnly
                        className="pl-5"
                      />
                      <p className="text-xl p-5 mt-2 font-bold">
                        (2 Customer reviewed)
                      </p>
                    </div>
                    <div className="flex text-2xl gap-2 ml-5">
                      <p className="font-bold">Price: </p>
                      <p className="l-10 text-red-500 font-bold">
                        ${product.price}
                      </p>
                    </div>
                    <div className=" flex gap-2 text-2xl font-bold ml-5 mt-5">
                      <p className="font-bold">Available:</p>
                      <p className="text-red-500">{product.quantity}</p>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="text-4xl p-4 bg-gray-800 text-black rounded-xl transition duration-300 delay-100 mt-10 hover:bg-gray-700 text-white"
                    >
                      Add to Cart
                    </button>
                  </div>
                </>
              ) : (
                <Spinner className="" />
              )}
            </div>
          </div>
        </div>
        <Tabss product={product} className="w-96" />
        <div>
          <form onSubmit={handleSubmit} className="mt-8">
            <h2 className="text-2xl font-bold mb-2">Rate this product</h2>
            <div className="mb-4">
              <label htmlFor="rating" className="block text-lg font-semibold">
                Rating:
              </label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-lg font-semibold">
                Comment:
              </label>
              <textarea
                id="comment"
                rows="4"
                cols="50"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </>
    );
  };

  return <ProductRatingForm />;
};

export default ProductDetail;
