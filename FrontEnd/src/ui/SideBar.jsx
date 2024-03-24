import { Link } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

function SideBar() {
  return (
    <Sidebar
      aria-label="Default sidebar example"
      className="w-1/5 h-screen fixed"
    >
      <Sidebar.Items className="mt-52 ">
        <Sidebar.ItemGroup>
          <Link to="dashboard">
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
            <Sidebar.Item icon={HiShoppingBag} className="text-3xl my-5 mx-2">
              Reatilers
            </Sidebar.Item>
          </Link>
          <Link>
            <Sidebar.Item icon={HiTable} className="text-3xl my-5 mx-2">
              Logout
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBar;
