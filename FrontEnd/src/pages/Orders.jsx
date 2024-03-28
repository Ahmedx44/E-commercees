import { Table } from "flowbite-react";
import Title from "../ui/Title";
import { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown } from "flowbite-react";
import Spinner from "../ui/Spinner"; // Import the Spinner component

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/orders");
        console.log(response);
        setOrders(response.data.data.orders); // Assuming response.data contains the data object
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-slate-200 h-full">
      <Title name={"Orders"} />

      <div className="m-24 px-10 py-10 pb-10 mb-10 bg-slate-100 h-screen shadow-lg rounded-2xl overflow-x-auto">
        {loading ? ( // Display spinner while loading
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          <Table hoverable>
            <Table.Head className="font-bolder text-lg text-slate-700">
              <Table.HeadCell>Order Id</Table.HeadCell>
              <Table.HeadCell>User Id</Table.HeadCell>
              <Table.HeadCell>Number of product</Table.HeadCell>
              <Table.HeadCell>Total Amount</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {orders.map((order) => (
                <Table.Row key={order._id} className="font-bold text-lg">
                  <Table.Cell>{order._id}</Table.Cell>
                  <Table.Cell>{order.userId}</Table.Cell>
                  <Table.Cell>{order.products.length}</Table.Cell>
                  <Table.Cell>{order.totalAmount} ETB</Table.Cell>
                  <Table.Cell>{order.status}</Table.Cell>
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
        )}
      </div>
    </div>
  );
}

export default Orders;
