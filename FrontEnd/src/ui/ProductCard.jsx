import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function ProductCard({ product }) {
  return (
    <Link to={`/productdetail/${product._id}`}>
      <Card className="w-96 h-13  border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader shadow={false} floated={false} className="h-96">
          <img
            src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="px-6 py-4">
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {product.name}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              ${product.price}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {product.description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            className="w-full bg-blue-500 text-white shadow-none hover:bg-blue-600 hover:shadow-none focus:bg-blue-600 focus:shadow-none active:bg-blue-500"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ProductCard;
