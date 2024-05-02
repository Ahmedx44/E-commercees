import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "./../store";
import Button from "../ui/Button";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    if (product) {
      if (!product.id) {
        console.error("Product is missing an id property");
        return;
      }
    }
  };

  const handleRemoveFromCart = (itemId, itemName) => {
    dispatch(removeFromCart(itemId));
    toast.success(`${itemName} has been removed from the cart`);
  };

  const handleIncreaseQuantity = (product) => {
    dispatch(increaseQuantity(product));
    toast.success(` increased the quantity`);
  };

  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseQuantity(product));
    toast.success(`decreased the quantity`);
  };

  return (
    <>
      <div className="bg-indigo-400 p-20 mt-32 text-center text-white font-bold">
        <h1 className="text-4xl font-bold text-white ">Cart</h1>
        <p>Home | Cart</p>
      </div>
      <div className="mt-28 p-8 w-3/4 mx-auto bg-white rounded-md shadow-md">
        <Table className="text-xl">
          <thead>
            <tr>
              <th className="px-4 py-10">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-10 border-b font-bold text-left text-black text-xl">
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </td>
                <td className="px-4 py-2 border-b font-semibold">
                  ${item.price}
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleDecreaseQuantity(item)}
                    className="bg-indigo-500  text-white py-1 px-2 rounded"
                  >
                    -
                  </button>
                  <span className="m-10 text-7xl text-black">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncreaseQuantity(item)}
                    className="bg-indigo-500  text-white py-1 px-2 rounded"
                  >
                    +
                  </button>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleRemoveFromCart(item._id, item.name)} // Ensure item._id is passed
                    className="bg-indigo-400  text-white py-1 px-2 rounded-lg hover:bg-slate-700"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="mt-4 grid grid-cols-1 mr-10 gap-4">
          <div className="col-start-2">
            <div className="mr-4 font-bold text-black">
              Total Price:{" "}
              <span className="font-bold text-red-500">
                {cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
                ETB
              </span>
            </div>

            <Link to="/productlist">
              <Button
                color="black"
                className="text-white"
                name=" Continue Shopping"
              ></Button>
            </Link>
            <div className="mt-4">
              <Link to="/pay">
                <Button
                  color="black"
                  className="text-white bg-indigo-400"
                  name="Proceed to Checkout"
                >
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
