import axios from "axios";
import { useEffect, useState } from "react";

function History() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token"); // Assuming you're storing the token in localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/orders/65e613ab522e82182a1fb30f`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="flex justify-center items-center h-full pt-52">
      <table className="divide-y divide-gray-200 w-3/5 text-lg">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              N0
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              Products
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              Total Amount
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800">
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {order.products.length}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                ${order.totalAmount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default History;
