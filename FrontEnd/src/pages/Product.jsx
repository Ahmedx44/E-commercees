import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Breadcrumb } from "flowbite-react";
import { HiViewBoards } from "react-icons/hi";
import Spinner from "../ui/Spinner";
import { Link, useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4000/api/products");
        console.log(response.data); // Check response data
        setProducts(response.data.data);
        setLoading(false);
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/api/products/${id}`);
      toast.success("Deleted Successfully");
      // Refresh products after deletion
      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.log(error);
      toast.error("Couldn't Delete");
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <div className="text-2xl p-10 mt-16">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={HiViewBoards}>
            <p className="text-4xl font-bold">Product</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <input
        className="w-68 border-2 border-slate-100 p-2 rounded-lg mb-4"
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto p-16">
        <table className="table table-zebra p-16 text-2xl  roboto">
          <thead>
            <tr className="text-2xl text-black roboto">
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Average Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price} ETB</td>
                <td>{product.quantity}</td>
                <td>{product.rating}</td>
                <td>
                  <details className="dropdown">
                    <summary className="m-1 btn">Action</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                      <li>
                        <button onClick={() => handleViewClick(product._id)}>
                          View
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleDelete(product._id)}>
                          Delete
                        </button>
                      </li>
                    </ul>
                  </details>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
