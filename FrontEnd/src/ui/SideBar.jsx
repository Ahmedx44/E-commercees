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
      <Sidebar.Items className="mt-52 ">
        <Sidebar.ItemGroup>
          <Link to="dashboard">
            <Sidebar.Item icon={HiChartPie} className="text-4xl my-3 mx-2 ">
              Dasboard
            </Sidebar.Item>
          </Link>
          <Link to="products">
            <Sidebar.Item icon={HiViewBoards} className="text-4xl my-3 mx-2">
              Product
            </Sidebar.Item>
          </Link>
          <Link to="users">
            <Sidebar.Item icon={HiUser} className="text-4xl my-3 mx-2">
              User
            </Sidebar.Item>
          </Link>
          <Link to="orders">
            <Sidebar.Item icon={HiShoppingBag} className="text-4xl my-3 mx-2">
              Orders
            </Sidebar.Item>
          </Link>
          <Link to="retailers">
            <Sidebar.Item icon={HiShoppingBag} className="text-4xl my-3 mx-2">
              Reatilers
            </Sidebar.Item>
          </Link>
          <Link>
            <Sidebar.Item icon={HiTable} className="text-4xl my-3 mx-2">
              Logout
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBar;
