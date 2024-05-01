// Dashboard.js
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

function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

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
    // Corrected function name to 'fetchTotalUsers'
    try {
      const response = await fetch("http://127.0.0.1:4000/api/users");
      const data = await response.json();
      if (data && data.total) {
        setTotalUsers(data.total); // Corrected state name to 'totalUsers'
      }
    } catch (error) {
      console.error("Error fetching total users:", error);
    }
  };
  useEffect(() => {
    fetchTotalProducts();
    fetchTotalUsers(); // Corrected function name to 'fetchTotalUsers'
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
        <SmallCard name="Total Revenue" icon={<SiCashapp />} color={"indigo"} />
      </div>
      <div className="m-10 p-10  grid grid-cols-2 gap-10">
        <BasicPie className="col-span-1" />
      </div>
    </div>
  );
}

export default Dashboard;
