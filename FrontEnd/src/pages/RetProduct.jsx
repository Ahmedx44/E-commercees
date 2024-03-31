import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { MenuItem } from "@mui/material";
import { Table } from "flowbite-react";

function RetProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
      fetchProducts(decodedToken.id);
    }
  }, []);

  const fetchProducts = async (userId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/api/products/retailer/${userId}`
      );
      setProducts(response.data.data);
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen font-sans">
      <div className="p-10 overflow-x-auto">
        <Table hoverable striped>
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
                <Table.Cell></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default RetProduct;
