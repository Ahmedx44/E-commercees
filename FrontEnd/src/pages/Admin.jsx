import { Outlet } from "react-router";
import SideBar from "../ui/SideBar";

function Admin() {
  return (
    <div className="grid grid-cols-5 ">
      <div className="col-span-1">
        <SideBar />
      </div>
      <div className="col-span-4">
        <Outlet className="bg-yellow=500" />
      </div>
    </div>
  );
}

export default Admin;
