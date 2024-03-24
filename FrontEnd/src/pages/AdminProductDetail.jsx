import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function AdminProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/products/${id}`
        );
        const data = response.data.data;
        setProduct(data);
        toast.success("Product fetched successfully");

        console.log(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error fetching product");
      }
    };
    fetchProduct();
  }, []);
  return <div>Admin Product Detail</div>;
}

export default AdminProductDetail;
