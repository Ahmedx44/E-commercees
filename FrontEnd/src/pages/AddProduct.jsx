import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Breadcrumb } from "flowbite-react";
import { IoIosAdd } from "react-icons/io";
import { HiViewBoards } from "react-icons/hi";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

function AddProduct() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserId(decodedToken.id);
    }
  }, []);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://127.0.0.1:4000/api/products/addProduct",
        {
          name,
          description,
          price,
          quantity,
          category,
          image,
          retailer: userId,
        }
      );
      toast.success("Product created successfully!");
      // Clear input fields after successful creation
      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setCategory("");
      setImage("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create product.");
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFile(file);
  };

  return (
    <div className="container mx-auto px-4 py-8  h-screen roboto">
      <div className="text-2xl p-10">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Link to="/retailer/products">
            <Breadcrumb.Item href="/" icon={HiViewBoards}>
              <p className="text-4xl font-bold">Product</p>
            </Breadcrumb.Item>
          </Link>
          <Breadcrumb.Item href="#" icon={IoIosAdd}>
            <p className="text-4xl font-bold">Add Product</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-10  rounded-xl shadow-2xl w-2/3 mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold leading-6 text-gray-900">
              Product Information
            </h2>
            <p className="text-sm leading-6 text-gray-600">
              Enter details about the product.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-5 text-gray-900"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-5 text-gray-900"
              >
                Price
              </label>
              <input
                id="price"
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-5 text-gray-900"
              >
                Description
              </label>
              <textarea
                id="description"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium leading-5 text-gray-900"
              >
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-5 text-gray-900"
              >
                Category
              </label>
              <select
                id="category"
                className="select select-ghost w-full max-w-xs"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option disabled selected>
                  Select Category
                </option>
                <option>Electronic</option>
                <option>Fashion</option>
                <option>Furniture</option>
                <option>Fashion</option>
                <option>Mobile Phones</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium leading-5 text-gray-900">
                Image
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChange(e)}
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Upload Image
                </label>
                {image && (
                  <img
                    src={image}
                    alt="Product"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-96 h-96 flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden">
          {image ? (
            <img
              src={image}
              alt="Product"
              className="object-cover w-full h-full"
            />
          ) : (
            <p className="text-gray-500">Image Preview will appear here</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
