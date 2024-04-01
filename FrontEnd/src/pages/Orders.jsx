import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "flowbite-react";
import Title from "../ui/Title";
import Spinner from "../ui/Spinner";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { Breadcrumb } from "flowbite-react";
import { HiShoppingBag } from "react-icons/hi";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/orders");
        setOrders(response.data.data.orders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleClick = (orderId) => {
    navigate(`/admin/orderdetail/${orderId}`); // Redirect to order detail page with order ID
  };

  // Filter orders based on userName
  const filteredOrders = orders.filter((order) =>
    order.userName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-200 min-h-screen font-sans">
      <div className="text-2xl p-10 mt-16">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={HiShoppingBag}>
            <p className="text-4xl font-bold">Order</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="mx-8 my-4 p-8 bg-gray-100 shadow-lg rounded-xl overflow-x-auto">
        <input
          className="w-68 border-2 border-slate-300 p-2 rounded-lg mb-4"
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          <Table hoverable>
            <Table.Head className="text-xl p-4 text-gray-700">
              <Table.HeadCell>User Id</Table.HeadCell>
              <Table.HeadCell>Number of Product</Table.HeadCell>
              <Table.HeadCell>Total Amount</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {filteredOrders.map((order) => (
                <Table.Row key={order._id} className="font-semibold text-xl">
                  <Table.Cell>{order.userName}</Table.Cell>
                  <Table.Cell>{order.products.length}</Table.Cell>
                  <Table.Cell>{order.totalAmount} ETB</Table.Cell>
                  <Table.Cell>{order.status}</Table.Cell>
                  <Table.Cell>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Action
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Action"
                        >
                          <MenuItem onClick={() => handleClick(order._id)}>
                            View
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
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
