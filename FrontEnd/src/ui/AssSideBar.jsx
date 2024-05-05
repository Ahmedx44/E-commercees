import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiChartPie, HiShoppingBag } from "react-icons/hi";
import Logo from "../image/Screenshot from 2024-04-27 08-46-12.png";
import { RiLogoutCircleFill, RiOrganizationChart } from "react-icons/ri";
import toast from "react-hot-toast";

function AssSideBar() {
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    toast.success("Successfully logged out");
    // Redirect to the login page
    window.location.href = "/login"; // You can replace "/login" with your actual login route
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`h-screen w-3/3 text-black border-r border-gray-300 ${
        collapsed ? "w-16" : ""
      }`}
    >
      <div className="p-4">
        <div className="text-xl mb-4 ml-16 ">
          <img src={Logo} alt="" className="w-24" />
        </div>
        <nav className="mt-10">
          <ul>
            <li>
              <Link to="">
                <div className="flex items-center my-2 cursor-pointer text-3xl roboto p-5 hover:bg-slate-200 rounded-xl">
                  {!collapsed && <HiChartPie className="mr-2" />}
                  Chat
                </div>
              </Link>
            </li>
            <li>
              <Link to="orders">
                <div className="flex items-center my-2 cursor-pointer text-3xl roboto p-5 hover:bg-slate-200 rounded-xl">
                  {!collapsed && <HiShoppingBag className="mr-2" />}
                  Orders
                </div>
              </Link>
            </li>
            <div
              className="flex items-center my-2 cursor-pointer text-3xl roboto p-5 hover:bg-slate-200 rounded-xl"
              onClick={handleLogout}
            >
              {!collapsed && <RiLogoutCircleFill />}
              Logout
            </div>
          </ul>
        </nav>
      </div>
      <div
        className={`fixed bottom-5 left-2/3 cursor-pointer text-3xl roboto p-5 hover:bg-slate-200 rounded-xl ${
          collapsed ? "w-16" : ""
        }`}
        onClick={toggleCollapse}
      >
        <RiOrganizationChart />
      </div>
    </div>
  );
}

export default AssSideBar;
