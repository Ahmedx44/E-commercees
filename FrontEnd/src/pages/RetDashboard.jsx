import React, { useState, useEffect } from "react";
import SmallCard from "../ui/SmallCard";
import { FaCartArrowDown, FaProductHunt, FaRegUser } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import BasicPie from "../ui/BasicPie";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";

function RetDashboard() {
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

  useEffect(() => {
    fetchTotalProducts();
    fetchTotalUsers();
  }, []);

  return (
    <div className="h-screen rounded-lg">
      <div className="text-2xl p-10 mt-10">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={HiHome}>
            <p className="text-4xl font-bold">Dashboard</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="flex justify-around">
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
      <div className="m-10 p-10 grid grid-cols-2 gap-10">
        <BasicPie className="col-span-1" />
      </div>
    </div>
  );
}

export default RetDashboard;
