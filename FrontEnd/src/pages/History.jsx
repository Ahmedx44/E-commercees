import axios from "axios";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router";

function History() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true); // State for loading indicator
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken.id);
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/api/orders/orderHistory/${user}`
        );
        setOrders(response.data.data.orders);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false); // Also set loading to false in case of error
      }
    };

    if (user) {
      // Ensure user is set before fetching orders
      fetchOrders();
    }
  }, [token, user]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "yellow";
      case "processing":
        return "orange";
      case "completed":
        return "#7ABA78";
      default:
        return "white";
    }
  };

  const handleViewClick = (retailerId) => {
    navigate(`/historydetail/${retailerId}`);
  };

  return (
    <>
      <div className="bg-indigo-400 p-20 mt-32 text-center text-white font-bold roboto">
        <h1 className="text-4xl font-bold text-white ">Order History</h1>
        <p>Home | Order History</p>
      </div>
      <div className="flex justify-center items-center h-screen -mt-60">
        <div className="p-4 overflow-x-auto">
          <table className="table-fixed w-full text-center">
            <thead>
              <tr className="text-black text-2xl roboto">
                <th className="w-1/6 text-sm lg:text-2xl">Order Id</th>
                <th className="w-1/6 text-sm lg:text-2xl">Number of Product</th>
                <th className="w-1/6 text-sm lg:text-2xl">Total Amount</th>
                <th className="w-1/6 text-sm lg:text-2xl">Status</th>
                <th className="w-1/6 text-sm lg:text-2xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    <Spinner />
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr key={order._id}>
                    <td className="w-1/6 text-sm xl:text-2xl lg:text-2xl">
                      {order._id}
                    </td>
                    <td className="w-1/6 text-sm xl:text-2xl lg:text-2xl">
                      {order.products.length}
                    </td>
                    <td className="w-1/6 text-sm xl:text-2xl lg:text-2xl">
                      {order.totalAmount} ETB
                    </td>
                    <td className="w-1/6 text-sm xl:text-2xl lg:text-2xl">
                      <span
                        style={{
                          backgroundColor: getStatusColor(order.status),
                          color: "white",
                          font: "bold",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="w-1/6">
                      <button
                        onClick={() => handleViewClick(order._id)}
                        className="btn"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default History;
