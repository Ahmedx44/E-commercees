import { Table } from "flowbite-react";
import Title from "../ui/Title";

function AdminRetailers() {
  return (
    <div className="bg-slate-200">
      <Title name={"Retailers"} />
      <div className="m-24 px-10 py-10 bg-white h-screen shadow-lg rounded-lg">
        <Table>
          <thead>
            <tr className="text-2xl font-bold py-10 text-center text-black ">
              <td>Name</td>
              <td>Retailer</td>
              <td>Stock</td>
              <td>Catgory</td>
            </tr>
          </thead>
        </Table>
      </div>
    </div>
  );
}

export default AdminRetailers;
