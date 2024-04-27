import { Link } from "react-router-dom";
import {
  HiChartPie,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import React from "react";
import { RiLogoutCircleFill, RiOrganizationChart } from "react-icons/ri";
import Logo from "../image/Screenshot from 2024-04-27 08-46-12.png";

function SideBar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Redirect to the login page
    window.location.href = "/login"; // You can replace "/login" with your actual login route
  };

  return (
    <div className="h-screen fixed top-0 left-0  text-black  w-96 transition duration-300 ease-in-out transform">
      <div className="p-4">
        <div className="text-2xl mb-4 ">
          <img src={Logo} alt="" className="w-24" />
        </div>
        <nav className="mt-28">
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
                  <HiViewBoards className="mr-2" />
                  Product
                </div>
              </Link>
            </li>
            <li>
              <Link to="users">
                <div className="flex items-center my-2 cursor-pointer text-3xl roboto p-5 hover:bg-slate-200 rounded-xl">
                  <HiUser className="mr-2" />
                  Customers
                </div>
              </Link>
            </li>
            <li>
              <Link to="orders">
                <div className="flex items-center my-2 cursor-pointer text-3xl roboto p-5 hover:bg-slate-200 rounded-xl">
                  <HiShoppingBag className="mr-2" />
                  Orders
                </div>
              </Link>
            </li>
            <li>
              <Link to="retailers">
                <div className="flex items-center my-2 cursor-pointer text-3xl roboto p-5 hover:bg-slate-200 rounded-xl">
                  <RiOrganizationChart className="mr-2" />
                  Retailers
                </div>
              </Link>
            </li>
          </ul>
        </nav>
        <div
          className="flex items-center my-2 cursor-pointer text-3xl roboto p-5 hover:bg-slate-200 rounded-xl"
          onClick={handleLogout}
        >
          <RiLogoutCircleFill />
          Logout
        </div>
      </div>
      <div
        className={`h-screen fixed top-0 left-0 w-64 bg-gray-800 text-white transition duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="flex items-center p-4 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <nav className="mt-28">
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
                  <HiViewBoards className="mr-2" />
                  Product
                </div>
              </Link>
            </li>
            <li>
              <Link to="users">
                <div className="flex items-center my-2 cursor-pointer text-3xl roboto p-5 hover:bg-slate-200 rounded-xl">
                  <HiUser className="mr-2" />
                  Customers
                </div>
              </Link>
            </li>
            <li>
              <Link to="orders">
                <div className="flex items-center my-2 cursor-pointer text-3xl roboto p-5 hover:bg-slate-200 rounded-xl">
                  <HiShoppingBag className="mr-2" />
                  Orders
                </div>
              </Link>
            </li>
            <li>
              <Link to="retailers">
                <div className="flex items-center my-2 cursor-pointer text-3xl roboto p-5 hover:bg-slate-200 rounded-xl">
                  <RiOrganizationChart className="mr-2" />
                  Retailers
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SideBar;
