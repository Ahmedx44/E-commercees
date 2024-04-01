import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "flowbite-react";
import Spinner from "../ui/Spinner";
import { HiViewBoards } from "react-icons/hi";
import { Breadcrumb } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/products");
        setProducts(response.data.data);
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleViewClick = (productId) => {
    // Redirect to admin product detail page
    navigate(`/admin/productdetail-admin/${productId}`);
  };

  return (
    <div className="bg-gray-200 min-h-screen font-sans">
      <div className="text-2xl p-10 mt-16">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={HiViewBoards}>
            <p className="text-4xl font-bold">Product</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="mx-8 my-4 p-8 bg-gray-100 shadow-lg rounded-xl overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-gray-300 p-2 rounded-lg"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          <Table hoverable>
            <Table.Head className="text-xl p-4 text-gray-700">
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Stock</Table.HeadCell>
              <Table.HeadCell>Rating</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {products.map((product) => (
                <Table.Row key={product._id} className="font-semibold text-lg">
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell>{product.price}</Table.Cell>
                  <Table.Cell>{product.quantity}</Table.Cell>
                  <Table.Cell>{product.rating}</Table.Cell>
                  <Table.Cell>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Action"
                      >
                        <MenuItem onClick={() => handleViewClick(product._id)}>
                          View
                        </MenuItem>
                        <MenuItem>Delete</MenuItem>
                      </Select>
                    </FormControl>
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

export default Products;
