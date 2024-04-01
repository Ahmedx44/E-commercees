import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { MenuItem } from "@mui/material";
import { Table } from "flowbite-react";

function RetProduct() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
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
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-200 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 border-gray-300 rounded-lg w-3/4 p-3 m-16"
        />
      </div>
      <div className="p-10 overflow-x-auto w-3/4 m-auto">
        <Link to="/retailer/addproduct">
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mb-4">
            Add Product
          </button>
        </Link>
        <Table hoverable striped>
          <Table.Head className="text-lg bg-gray-700 text-white">
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Stock</Table.HeadCell>
            <Table.HeadCell>Rating</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center">
                  <Spinner />
                </td>
              </tr>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Table.Row key={product._id} className="text-lg">
                  <Table.Cell>{product.name}</Table.Cell>
                  <Table.Cell>${product.price}</Table.Cell>
                  <Table.Cell>{product.quantity}</Table.Cell>
                  <Table.Cell>{product.rating}</Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/product/${product._id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No products found.
                </td>
              </tr>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default RetProduct;
