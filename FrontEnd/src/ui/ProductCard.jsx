import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa6";
import { Rating } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { addToCart } from "./../store";
import toast, { Toaster } from "react-hot-toast";

export function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Product added to cart!", {
      duration: 2000,
    });
  };

  return (
    <Card className="w-96 h-13 border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader shadow={false} floated={false} className="h-64">
        <img src={product.image} alt="card-image" className="h-full w-full " />
      </CardHeader>
      <CardBody className="px-6 py-4">
        <div className="mb-2 flex items-center justify-between">
          <Link to={`/productdetail/${product._id}`}>
            <Typography
              color="blue-gray"
              className="text-xl font-bold text-black hover:text-grey-700"
            >
              {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
            </Typography>
          </Link>
          <Typography color="blue-gray" className="text-xl font-bold">
            ${product.price}
          </Typography>
        </div>
        <Typography
          variant="big"
          color="gray"
          className="font-normal opacity-75"
        ></Typography>
        <Typography component="legend" className="font-bold">
          Rating
        </Typography>
        <Rating name="disabled" value={product.rating} disabled />
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          onClick={handleAddToCart}
          className="w-full bg-black text-white shadow-none hover:bg-gray-700 hover:shadow-none flex justify-center items-center transition duration-300 delay-100"
        >
          <FaCartArrowDown className="text-white text-lg mr-3 size-6" />
          <span className="text-lg">Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
