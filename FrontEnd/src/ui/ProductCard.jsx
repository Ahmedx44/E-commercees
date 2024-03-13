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
import { useToast } from "react-hot-toast";

export function ProductCard({ product }) {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Product added to cart!");
  };
  return (
    <Card className="w-96 h-13 border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader shadow={false} floated={false} className="h-64">
        <img
          src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
          alt="card-image"
          className="h-full w-full object-cover"
        />
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
          <Typography color="blue-gray" className=" text-xl font-bold ">
            ${product.price}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        ></Typography>
        <Typography component="legend" className="font-bold">
          Rating
        </Typography>
        <Rating name="read-only" value={product.rating} readOnly />
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