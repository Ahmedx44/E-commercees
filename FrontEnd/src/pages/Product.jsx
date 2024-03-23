import Title from "../ui/Title";
import { Table } from "flowbite-react";

function Product() {
  return (
    <div className="bg-slate-200">
      <Title name={"Product"} />
      <div className="m-24 px-10 py-10 bg-white h-screen shadow-lg rounded-lg">
        <Table>
          <thead>
            <tr className="text-2xl font-bold py-10 text-center ">
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

export default Product;
