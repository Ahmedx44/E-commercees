import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Title from "../ui/Title";
import Modal from "react-modal"; // Import Modal component
import AddModal from "./../ui/AddModal"; // Import AddModal component

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State to control Add Modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/products");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewClick = (productId) => {
    // Redirect to admin product detail page
    navigate(`/admin/productdetail-admin/${productId}`);
  };

  const handleAddProductClick = () => {
    setIsAddModalOpen(true); // Open the Add Modal when "Add Product" button is clicked
  };

  return (
    <div className="bg-slate-200 h-full ">
      <Title name={"Product"} />
      <div className="m-24 px-10 py-10 pb-10 mb-10 bg-slate-100 h-screen shadow-lg rounded-2xl overflow-x-auto">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-slate-300 p-2 rounded-lg mb-4"
          />
          <button
            className="bg-slate-600 p-1 rounded-lg  text-white px-5 h-14"
            onClick={handleAddProductClick}
          >
            Add Product
          </button>
        </div>

        <Table hoverable>
          <Table.Head className=" font-bolder text-lg text-slate-700">
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Stock</Table.HeadCell>
            <Table.HeadCell>Rating</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredProducts.map((product) => (
              <Table.Row key={product._id} className="font-bold  text-lg">
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell>{product.quantity}</Table.Cell>
                <Table.Cell>{product.rating}</Table.Cell>
                <Table.Cell>
                  <Dropdown label="Action" dismissOnClick={false}>
                    <Dropdown.Item onClick={() => handleViewClick(product._id)}>
                      View
                    </Dropdown.Item>
                    <Dropdown.Item>Delete</Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
      >
        <AddModal closeModal={() => setIsAddModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default Products;
