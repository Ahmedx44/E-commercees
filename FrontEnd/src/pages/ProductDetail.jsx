import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "./../store";
import axios from "axios";

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
    <div className="">
      <div className="bg-slate-300 p-9 mt-24 text-center">
        <h1>Product Details</h1>
        <p>Home</p>
      </div>
      <div>
        <div className="w-2/4 h-96 red relative top-9 left-96 flex justify-between justify-center rounded-lg">
          <div className="flex items-center ">
            {product && (
              <>
                <img
                  src="../src/data/pexels-porapak-apichodilok-346748.jpg"
                  alt=""
                  className="w-96 h-96 object-cover object-center mr-9 p-7"
                />
                <div className="text-white bold text-5xl">
                  <h2 className="text-3xl font-bold p-5">{product.name}</h2>
                  <p className="p-5 text-2xl">{product.description}</p>
                  <p className="p-5 text-3xl">${product.price}</p>

                  <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
