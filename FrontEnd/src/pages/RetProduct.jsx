import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../ui/Spinner";
import ProductReview from "../pages/ProductReview";
import { useNavigate } from "react-router-dom";

function RetProduct() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate(); // Add this line

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
        `http://127.0.0.1:4000/api/products/retailer/${userId}`
      );
      setProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
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

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleClick = (orderId) => {
    navigate(`/retailer/productreview/${orderId}`);
  };

  return (
    <div className="min-h-screen font-sans">
      <div className="text-4xl font-bold  p-8">Products</div>

      <div className="p-16 mx-auto">
        <div className="flex justify-between p-10">
          <input
            className="border-2 border-gray-300 rounded-lg p-2"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link
            to="/retailer/addproduct"
            className="bg-indigo-400  text-white font-bold  hover:bg-indigo-600 p-3 text-xl rounded-xl"
          >
            Add Product
          </Link>
        </div>
        <div className="overflow-x-auto roboto">
          <table className="min-w-full bg-white">
            <thead className="text-black text-lg">
              <tr>
                <th className="px-4 py-2 text-left font-bold uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-2 text-left font-bold uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-2 text-left font-bold uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-4 py-2 text-left font-bold uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-4 py-2 text-left font-bold uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-gray-200 text-lg">
              {loading ? (
                <tr>
                  <td colSpan="5" className="whitespace-nowrap text-center">
                    <Spinner />
                  </td>
                </tr>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="bg-white font-bold">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {product.price} ETB
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {product.quantity}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {product.rating}
                    </td>
                    <td>
                      <details className="dropdown">
                        <summary className="m-1 btn">Action</summary>
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                          <li>
                            <button onClick={() => handleClick(product._id)}>
                              Review
                            </button>
                          </li>
                          <li>
                            <button onClick={() => handleDelete(product._id)}>
                              Remove
                            </button>
                          </li>
                        </ul>
                      </details>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-3 whitespace-nowrap text-center"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RetProduct;
