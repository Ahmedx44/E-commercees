import SmallCard from "../ui/SmallCard";
import { FaCartArrowDown } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";

function Dashboard() {
  return (
    <div className="bg-slate-100 h-screen rounded-lg">
      <div className="pt-10 mx-10 font-bold text-5xl ">
        <h1>Dashboard</h1>
      </div>
      <div className="flex  justify-around">
        <SmallCard name="Total Order" icon={<FaCartArrowDown />} />
        <SmallCard name="Total Products" icon={<FaProductHunt />} />
        <SmallCard name="Total Users" icon={<FaRegUser />} />
        <SmallCard name="Total Revenue" icon={<SiCashapp />} />
      </div>
    </div>
  );
}

export default Dashboard;
