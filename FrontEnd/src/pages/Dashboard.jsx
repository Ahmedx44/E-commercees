import SmallCard from "../ui/SmallCard";
import { FaCartArrowDown } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import Title from "../ui/Title";
import BasicPie from "../ui/BasicPie";

function Dashboard() {
  return (
    <div className="bg-slate-200 h-screen rounded-lg">
      <Title name={"Dashboard"} />
      <div className="pt-10 mx-10 font-bold text-5xl "></div>
      <div className="flex  justify-around">
        <SmallCard name="Total Order" icon={<FaCartArrowDown />} />
        <SmallCard name="Total Products" icon={<FaProductHunt />} />
        <SmallCard name="Total Users" icon={<FaRegUser />} />
        <SmallCard name="Total Revenue" icon={<SiCashapp />} />
      </div>
      <div className="m-10 p-10 bg-white shadow-lg rounded-lg ">
        <BasicPie />
      </div>
    </div>
  );
}

export default Dashboard;
