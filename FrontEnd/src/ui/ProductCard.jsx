import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaCartArrowDown } from "react-icons/fa6";
import { Rating } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { addToCart } from "./../store";
import toast from "react-hot-toast";
import { Link } from "react-router-dom"; // Import Link component
import { useSelector } from "react-redux";

export function ProductCard({ product }) {
  const dispatch = useDispatch();

  const language = useSelector((state) => state.language.language);
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Product added to cart!", {
      duration: 2000,
    });
  };

  // Capitalize the first letter of product.name
  const capitalizedProductName =
    product.name.charAt(0).toUpperCase() + product.name.slice(1);

  return (
    <Card className=" 2xl:w-full w-72 lg:w-full xl:w-full md:w- border-gray-300 shadow-2xl transition-shadow duration-300 bg-gray-50 ">
      <CardHeader shadow={false} floated={false} className="h-80">
        <img src={product.image} alt="card-image" className="h-full  " />
      </CardHeader>
      <CardBody className="px-4 py-2">
        <div className="mb-2 flex items-center justify-between">
          <Link
            to={`/productdetail/${product._id}`}
            className="text-lg font-bold text-black hover:text-gray-700"
          >
            {capitalizedProductName} {/* Use the capitalized product name */}
          </Link>
          <Typography color="blue-gray" className="text-lg font-bold">
            {product.price} ETB
          </Typography>
        </div>
        <Typography
          variant="big"
          color="gray"
          className="font-normal opacity-75"
        ></Typography>
        <Typography component="legend" className="font-bold">
          {language === "en" ? "Rating" : "ደረጃ:"}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          onClick={handleAddToCart}
          className="w-full text-white bg-indigo-400 shadow-none hover:bg-indigo-700 hover:shadow-none flex justify-center items-center transition duration-300 delay-100"
        >
          <FaCartArrowDown className="text-white text-lg mr-3 size-6" />
          <span className="text-lg">
            {" "}
            {language === "en" ? "Add to Cart" : "ወደ ግዢው ቅርጫት ጨምር"}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
