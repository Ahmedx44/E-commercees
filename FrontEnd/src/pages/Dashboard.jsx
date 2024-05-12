import { useState, useEffect } from "react";
import SmallCard from "../ui/SmallCard";
import { FaCartArrowDown } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { FiHome } from "react-icons/fi";
import BasicPie from "../ui/BasicPie";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import axios from "axios";

function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [combinedTotal, setCombinedTotal] = useState(0);
  const [OrderCount, setOrderCount] = useState(0);
  const [pendingOrders, setPendingOrders] = useState([]);

  const fetchTotalProducts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:4000/api/products");
      const data = await response.json();
      if (data && data.total) {
        setTotalProducts(data.total);
      }
    } catch (error) {
      console.error("Error fetching total products:", error);
    }
  };

  const fetchTotalUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:4000/api/users");
      const data = await response.json();
      if (data && data.total) {
        setTotalUsers(data.total);
      }
    } catch (error) {
      console.error("Error fetching total users:", error);
    }
  };

  const fetchOrdersAndCalculateTotal = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:4000/api/orders");
      const orders = response.data.data.orders;
      let total = 0;
      let pending = [];
      orders.forEach((order) => {
        total += order.totalAmount;
        if (order.status === "Pending") {
          pending.push(order);
        }
      });
      setCombinedTotal(total);
      setPendingOrders(pending);
      setOrderCount(pending.length);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchTotalProducts();
    fetchTotalUsers();
    fetchOrdersAndCalculateTotal();
  }, []);

  return (
    <div className=" h-screen rounded-lg">
      <div className="text-2xl p-10 mt-10">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={HiHome}>
            <p className="text-4xl font-bold">Dashboard</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="flex  justify-around">
        <SmallCard
          name="Total Order"
          icon={<FaCartArrowDown />}
          number={OrderCount}
          color={"red"}
        />
        <SmallCard
          name="Total Products"
          number={totalProducts}
          icon={<FaProductHunt />}
          color={"green"}
        />
        <SmallCard
          name="Total Users"
          number={totalUsers}
          icon={<FaRegUser />}
          color={"yellow"}
        />
        <SmallCard
          name="Total Revenue"
          icon={<SiCashapp />}
          number={`${combinedTotal} Birr`}
          color={"indigo"}
          className="text-sm"
        />
      </div>
      <div className="m-10 p-10  grid grid-cols-2 gap-10">
        <BasicPie className="col-span-1" />
      </div>

      <div>
        <ul>
          {pendingOrders.map((order) => (
            <li key={order._id}>
              Order ID: {order._id}, Total Amount: {order.totalAmount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
