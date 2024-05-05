import React from "react";
import { Link } from "react-router-dom";
import { HiChartPie, HiShoppingBag } from "react-icons/hi";
import Logo from "../image/Screenshot from 2024-05-05 17-06-11.png";
import { RiLogoutCircleFill, RiOrganizationChart } from "react-icons/ri";
import toast from "react-hot-toast";

function RetSideBar() {
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    toast.success("Succefully logged out");
    // Redirect to the login page
    window.location.href = "/login"; // You can replace "/login" with your actual login route
  };
  return (
    <div className="h-screen w-3/3 text-black border-r border-gray-300">
      <div className="p-4">
        <div className="text-xl mb-4 ml-16 ">
          <img src={Logo} alt="" className="w-96" />
        </div>
        <nav className="mt-10">
          <ul>
            <li>
              <Link to="">
                <div className="flex items-center my-2 cursor-pointer text-3xl roboto p-5 hover:bg-slate-200 rounded-xl">
                  <HiChartPie className="mr-2" />
                  Dashboard
                </div>
              </Link>
            </li>
            <li>
              <Link to="products">
                <div className="flex items-center my-2 cursor-pointer text-3xl roboto p-5 hover:bg-slate-200 rounded-xl">
                  <HiShoppingBag className="mr-2" />
                  Products
                </div>
              </Link>
            </li>

            <div
              className="flex items-center my-2 cursor-pointer text-3xl roboto p-5 hover:bg-slate-200 rounded-xl"
              onClick={handleLogout}
            >
              <RiLogoutCircleFill />
              Logout
            </div>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default RetSideBar;
