import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "./../store";

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
    <div className="mt-96 bg-gray-100 p-8">
      <table className="w-full table-auto text-center bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={item.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">${item.price}</td>
              <td className="border px-4 py-2">
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
              <td className="border px-4 py-2">
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
      <div className="mt-4">
        Total Price: $
        {cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
      </div>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Proceed to Checkout
      </button>
    </div>
  );
};

// Export the Cart component as the default export
export default Cart;
