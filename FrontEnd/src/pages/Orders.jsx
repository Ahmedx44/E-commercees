import { Table } from "flowbite-react";
import Title from "../ui/Title";
import { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown } from "flowbite-react";

function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/orders");
        console.log(response);
        setOrders(response.data.data.orders); // Assuming response.data contains the data object
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="bg-slate-200 h-full ">
      <Title name={"Orders"} />

      <div className="m-24 px-10 py-10 pb-10 mb-10 bg-slate-100 h-screen shadow-lg rounded-2xl overflow-x-auto">
        <Table hoverable>
          <Table.Head className=" font-bolder text-lg text-slate-700">
            <Table.HeadCell>Order Id</Table.HeadCell>
            <Table.HeadCell>User Id</Table.HeadCell>
            <Table.HeadCell>Number of product</Table.HeadCell>
            <Table.HeadCell>Total Amount</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {orders.map((orders) => (
              <Table.Row key={orders._id} className="font-bold  text-lg">
                <Table.Cell>{orders._id}</Table.Cell>
                <Table.Cell>{orders.userId}</Table.Cell>
                <Table.Cell>{orders.products.length}</Table.Cell>
                <Table.Cell>{orders.totalAmount} ETB</Table.Cell>
                <Table.Cell>{orders.status}</Table.Cell>
                <Table.Cell>
                  <Dropdown label="Action" dismissOnClick={false}>
                    <Dropdown.Item>Edit</Dropdown.Item>
                    <Dropdown.Item>Delete</Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default Orders;
