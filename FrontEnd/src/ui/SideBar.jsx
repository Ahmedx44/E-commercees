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

// function SideBar() {
//   return (
//     <div className="flex flex-col items-center bg-black text-white h-full gap-10">
//
//
//
//
//
//
//     </div>
//   );
// }

// export default SideBar;

function SideBar() {
  return (
    <Sidebar aria-label="Default sidebar example" className="w-full h-screen ">
      <Sidebar.Items className="mt-52 flex flex-col gap-20">
        <Sidebar.ItemGroup>
          <Link to="dashboard">
            <Sidebar.Item icon={HiChartPie} className="text-3xl">
              Dasboard
            </Sidebar.Item>
          </Link>
          <Link to="products">
            <Sidebar.Item icon={HiViewBoards} className="text-3xl">
              Product
            </Sidebar.Item>
          </Link>
          <Link to="users">
            <Sidebar.Item icon={HiUser} label="3" className="text-3xl">
              User
            </Sidebar.Item>
          </Link>
          <Link to="orders">
            <Sidebar.Item icon={HiShoppingBag} className="text-3xl">
              Orders
            </Sidebar.Item>
          </Link>
          <Link to="retailers">
            <Sidebar.Item icon={HiShoppingBag} className="text-3xl">
              Reatilers
            </Sidebar.Item>
          </Link>
          <Link to="reviews">
            <Sidebar.Item icon={HiArrowSmRight} className="text-3xl">
              Reviews
            </Sidebar.Item>
          </Link>
          <Link>
            <Sidebar.Item icon={HiTable} className="text-3xl">
              Logout
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBar;
