import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "./../store";
import Button from "../ui/Button";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    if (product) {
      // Ensure product has an id property
      if (!product.id) {
        console.error("Product is missing an id property");
        return;
      }
      dispatch(addToCart(product));
    }
  };

  return (
    <>
      <div className="bg-slate-300 p-9 mt-24 text-center">
        <h1 className="text-4xl font-bold">Cart</h1>
        <p>Home | Cart</p>
      </div>
      <div className="mt-28 p-8">
        <table className="w-9/12 table-auto text-center bg-white rounded-lg overflow-hidden border-collapse mx-auto">
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
              <tr key={item.id} className={item.id % 2 === 0 ? "" : ""}>
                <td className="px-4 py-10 border-b">{item.name}</td>
                <td className="px-4 py-2 border-b">${item.price}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="bg-blue-500 text-white py-1 px-2 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="bg-blue-500 text-white py-1 px-2 rounded"
                  >
                    +
                  </button>
                </td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 grid grid-cols-1 mr-10 gap-4">
          <div className="col-start-2">
            <div className="mr-4">
              Total Price:{" "}
              <span className="font-bold text-red-500">
                $
                {cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </span>
            </div>
            <div className="mt-4">
              <Button
                color="red"
                className="text-white"
                name="Proceed to Checkout"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
