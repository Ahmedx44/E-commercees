import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "./../store";
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
import Tabs from "./../ui/Tabs";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:3000/api/products/${id}`
          );
          setProduct(response.data.data);
        } catch (error) {
          console.error("Error fetching product:", error);
          // Handle error
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      console.log("Adding to cart:", product); // Add this line
      dispatch(addToCart(product));
    }
  };

  return (
    <>
      <div className="bg-black p-20 mt-24 text-center text-white font-bold ">
        <h1 className="text-4xl font-bold text-white mb-3 ">Product Detail</h1>
        <p>Home | Product Detail</p>
      </div>

      <div className="mb-30">
        <div className="w-3/4 width bg-black rounded-lg relative top-9 left-96 flex justify-between justify-center rounded-lg">
          <div className="flex items-center ">
            {product && (
              <>
                <img
                  src="../src/data/pexels-porapak-apichodilok-346748.jpg"
                  alt=""
                  className="w-96 heightimg object-cover object-center mr-9 p-7 rounded-xl pl-24"
                />
                <div className="text-white bold text-5xl">
                  <h2 className="text-5xl font-bold p-5">
                    {product.name.charAt(0).toUpperCase() +
                      product.name.slice(1)}
                  </h2>
                  <p className="text-xl pl-6">By: Ahmed</p>
                  <Typography
                    component="legend"
                    className="font-bold pl-5 pt-10 text-5xl"
                  >
                    Rating
                  </Typography>
                  <Rating
                    name="read-only"
                    value={product.rating}
                    readOnly
                    className="p-5 text-5xl "
                  />
                  <p className="p-5 text-3xl">${product.price}</p>

                  <button
                    onClick={handleAddToCart}
                    className="text-4xl p-4 bg-white text-black rounded-xl transition duration-300 delay-100 hover:bg-gray-500 hover:text-white "
                  >
                    Add to Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Tabs product={product} />
    </>
  );
};

export default ProductDetail;
