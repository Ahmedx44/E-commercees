import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Link } from "react-router-dom";

function RetSideBar() {
  return (
    <Sidebar
      aria-label="Sidebar with logo branding example"
      className="h-screen w-3/3"
    >
      <Sidebar.Logo
        href=""
        img="/favicon.svg"
        imgAlt="Flowbite logo"
        className="mb-4"
      >
        Ethio-Bazaar
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="">
            <Sidebar.Item href="" icon={HiChartPie} className="text-4xl">
              Dashboard
            </Sidebar.Item>
          </Link>
          <Link to="products">
            <Sidebar.Item icon={HiShoppingBag} className="text-4xl">
              Products
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default RetSideBar;
