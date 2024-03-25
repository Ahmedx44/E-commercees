import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { v2 as Cloudinary } from "cloudinary";

const AddModel = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "your-preset-name");
    const result = await Cloudinary.v2.uploader.upload(formData);
    const newProduct = {
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      category,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    };
    await axios.post("/api/products", newProduct);
    closeModal();
  };

  return (
    <>
      <button onClick={openModal}>Add Product</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            step="0.01"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <br />
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <br />
          <button type="submit" disabled={!image}>
            Add
          </button>
        </form>
      </Modal>
    </>
  );
};

export default A