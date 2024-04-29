import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";

function History() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true); // State for loading indicator
  const token = localStorage.getItem("token");

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
        return "green";
      default:
        return "white";
    }
  };

  return (
    <>
      <div className="bg-indigo-700 p-20 mt-32 text-center text-white font-bold roboto">
        <h1 className="text-4xl font-bold text-white ">Order History</h1>
        <p>Home | Order History</p>
      </div>
      <div className="flex justify-center items-center h-screen -mt-60">
        <div className="p-16 overflow-x-auto">
          <table className="table table-zebra p-16 text-2xlroboto">
            <thead>
              <tr className="text-black text-2xl roboto">
                <th>Order Id</th>
                <th>Number of Product</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    <Spinner />
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr key={order._id}>
                    <td className="text-2xl  mb:text-sm">{order._id}</td>
                    <td className="text-xl sm:text-base">
                      {order.products.length}
                    </td>
                    <td className="text-xl sm:text-base">
                      {order.totalAmount} ETB
                    </td>
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
