import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Breadcrumb } from "flowbite-react";
import { IoIosAdd } from "react-icons/io";
import { HiViewBoards } from "react-icons/hi";

function AddProduct() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState("");

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
        "http://127.0.0.1:3000/api/products/addProduct",
        {
          name,
          description,
          price,
          quantity,
          category,
          image,
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
    <div className="container mx-auto px-4 py-8 bg-gray-200 h-screen">
      <div className="text-2xl p-10">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={HiViewBoards}>
            <p className="text-4xl font-bold">Product</p>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#" icon={IoIosAdd}>
            <p className="text-4xl font-bold">Add Product</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-10 bg-slate-50 rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price"
            id="price"
            name="price"
            className="rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            placeholder="Description"
            id="description"
            name="description"
            className="rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="number"
            placeholder="Quantity"
            id="quantity"
            name="quantity"
            className="rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <select
            name="category"
            className="rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 px-4 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            {/* Add more options as needed */}
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleChange(e)}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="bg-black text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-700 focus:outline-none focus:bg-gray-700  transition duration-200 text-center"
          >
            Upload Image
          </label>
          <button
            type="submit"
            className="bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700 focus:outline-none focus:bg-gray-700  transition duration-200"
          >
            Add Product
          </button>
        </div>

        <div className="w-96 h-96 flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden">
          {image ? (
            <img
              src={image}
              alt="Product"
              sizes="100px"
              className="object-cover w-full h-full"
            />
          ) : (
            <p className="text-gray-500">Image Preview will appear here</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
