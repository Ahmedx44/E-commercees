import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const [cartItems, setCartItems] = useState([]);

  const handleRemoveFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item._id !== id));
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handleQuantityChange = (itemId, quantity) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      )
    );
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: itemId, quantity } });
  };

  return (
    <div className="mt-32">
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Total Price</th>
            <th className="px-4 py-2">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr
              key={item._id}
              className={`${index % 2 === 0 ? "bg-gray-100" : ""}`}
            >
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">${item.price}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() =>
                    handleQuantityChange(item._id, item.quantity - 1)
                  }
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item._id, item.quantity + 1)
                  }
                  className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                >
                  +
                </button>
              </td>
              <td className="px-4 py-2">${item.price * item.quantity}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleRemoveFromCart(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right">
        <p>
          Total Price: $
          {cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )}
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Process to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
