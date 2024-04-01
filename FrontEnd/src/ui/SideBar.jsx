import { Link } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { RiLogoutCircleFill } from "react-icons/ri";
import { RiOrganizationChart } from "react-icons/ri";

function SideBar() {
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Redirect to the login page
    window.location.href = "/login"; // You can replace "/login" with your actual login route
  };
  return (
    <Sidebar
      aria-label="Default sidebar example"
      className="w-1/5 h-screen fixed"
    >
      <Sidebar.Items className="mt-52 ">
        <Sidebar.ItemGroup>
          <Link to="">
            <Sidebar.Item icon={HiChartPie} className="text-3xl my-5 mx-2 ">
              Dasboard
            </Sidebar.Item>
          </Link>
          <Link to="products">
            <Sidebar.Item icon={HiViewBoards} className="text-3xl my-5 mx-2">
              Product
            </Sidebar.Item>
          </Link>
          <Link to="users">
            <Sidebar.Item icon={HiUser} className="text-3xl my-5 mx-2">
              Customers
            </Sidebar.Item>
          </Link>
          <Link to="orders">
            <Sidebar.Item icon={HiShoppingBag} className="text-3xl my-5 mx-2">
              Orders
            </Sidebar.Item>
          </Link>
          <Link to="retailers">
            <Sidebar.Item
              icon={RiOrganizationChart}
              className="text-3xl my-5 mx-2"
            >
              Reatilers
            </Sidebar.Item>
          </Link>
          <Link to="addassistance">
            <Sidebar.Item
              icon={RiOrganizationChart}
              className="text-3xl my-5 mx-2"
            >
              Reatilers
            </Sidebar.Item>
          </Link>
          <Link onClick={handleLogout}>
            <Sidebar.Item
              icon={RiLogoutCircleFill}
              className="text-3xl my-5 mx-2"
            >
              Logout
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBar;
