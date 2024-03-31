import { Outlet } from "react-router";
import RetSideBar from "../ui/RetSideBar";

function Retailers() {
  return (
    <div className="grid grid-cols-6">
      <RetSideBar className="col-span-1 w-96" />

      <div className="col-span-5">
        <Outlet />
      </div>
    </div>
  );
}

export default Retailers;
