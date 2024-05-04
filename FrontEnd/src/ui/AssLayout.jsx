import { Outlet } from "react-router";
import AssSideBar from "../ui/AssSideBar";

function AssLayout() {
  return (
    <div className="grid grid-cols-6">
      <AssSideBar className="col-span-1 w-96" />

      <div className="col-span-5">
        <Outlet />
      </div>
    </div>
  );
}

export default AssLayout;
