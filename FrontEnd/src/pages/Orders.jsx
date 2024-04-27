import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../ui/Spinner";
import { Link, useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4000/api/orders");
        setOrders(response.data.data.orders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleClick = (orderId) => {
    navigate(`/admin/orderdetail/${orderId}`); // Redirect to order detail page with order ID
  };

  // Filter orders based on userName
  const filteredOrders = orders.filter((order) =>
    order.userName.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "yellow";
      case "processing":
        return "orange";
      case "completed":
        return "green";
      default:
        return "white";
    }
  };

  return (
    <div className=" min-h-screen font-sans">
      <div className="text-2xl p-10 mt-16">
        <h1 className="text-4xl font-bold">Order</h1>
      </div>

      <input
        className="w-68 border-2 border-slate-100 p-2 rounded-lg mb-4"
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      ) : (
        <div className="p-16">
          <table className="table table-zebra p-16 text-xl roboto">
            <thead>
              <tr className="text-black text-2xl roboto">
                <th>User Id</th>
                <th>Number of Product</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="text-2xl">{order.userName}</td>
                  <td className="text-xl">{order.products.length}</td>
                  <td className="text-xl">{order.totalAmount} ETB</td>
                  <td>
                    <span
                      style={{
                        backgroundColor: getStatusColor(order.status),
                        padding: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleClick(order._id)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;
