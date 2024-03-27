import { useState } from "react";
import Title from "./../ui/Title";
import axios from "axios";

function AddProduct() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  // const [retailerId, setRetailerId] = useState("");
  const [file, setFile] = useState("");

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
    console.log(image);
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
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFile(file);
  };

  return (
    <div className="">
      <Title name={"Add Product"} />
      <form className="grid grid-cols-2 gap-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="rounded-lg font-bold"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price"
            id="price"
            name="price"
            className="rounded-lg font-bold"
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="textarea"
            placeholder="Description"
            id="Description"
            name="Description"
            className="rounded-lg font-bold"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            id="quantity"
            name="quantity"
            className="rounded-lg font-bold"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <select
            name="Catgory"
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg font-bold"
          >
            <option value="">Select Catgory</option>
            <option value="Electronics">Electronics</option>
          </select>
          <input
            type="file"
            accept="image/"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="submit"
            onClick={handleSubmit}
            className="rounded-lg font-bold bg-slate-700 text-white w-56 m-auto"
          />
        </div>

        <div className="w-96 h-96 overflow-hidden border-black border-x-2 border-y-2">
          {image ? (
            <img
              src={image}
              alt="product image"
              className="object-cover object-center w-full h-full"
            />
          ) : (
            <p>Image Preview will appear here</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
