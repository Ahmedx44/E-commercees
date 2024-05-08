import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { DataList } from "@radix-ui/themes";

function AdminProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/api/products/${id}`
        );

        const data = response.data.data;

        console.log(data);
        setProduct(data);
        setId(data.retailer);
        console.log(idd);
        toast.success("Product fetched successfully");
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error fetching product");
      }
    };
    fetchProduct();
  }, [id]);

  const handleStatusChange = async () => {
    try {
      await axios.patch(`http://127.0.0.1:4000/api/products/${id}`, {
        status,
      });
      // Update the order status in the local state
      setProduct({ ...product, status });
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "yellow";
      case "confirmed":
        return "orange";
      case "completed":
        return "green";
      default:
        return "white";
    }
  };

  return (
    <div>
      {product && (
        <>
          <div className=" py-10 px-5 m-5 rounded-xl text-3xl font-bold flex items-center gap-2">
            Status:
            <select
              name=""
              id=""
              className="rounded-xl w-full p-5"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
            </select>
            <button
              onClick={handleStatusChange}
              className="text-white rounded-lg px-4 py-2 bg-green-400"
            >
              Update Status
            </button>
          </div>
          <DataList.Root className=" py-10 px-5  rounded-xl m-5 gap-5">
            <DataList.Item align="center">
              <DataList.Label className="font-bold">Name:</DataList.Label>
              <DataList.Value>
                <span className="text-green-500">{product.name}</span>
              </DataList.Value>
              <DataList.Label className="font-bold">Price:</DataList.Label>
              <DataList.Value>
                <span className="text-green-500">{product.price}</span>
              </DataList.Value>
              <DataList.Label className="font-bold">quantity:</DataList.Label>
              <DataList.Value>
                <span className="text-green-500">{product.quantity}</span>
              </DataList.Value>
              <DataList.Label className="font-bold">Rating:</DataList.Label>
              <DataList.Value>
                <span className="text-green-500">{product.rating}</span>
              </DataList.Value>
              <DataList.Label className="font-bold">Status:</DataList.Label>
              <DataList.Value>
                <span className="text-green-500">{product.status}</span>
              </DataList.Value>
              <DataList.Label className="font-bold">Retailer:</DataList.Label>
              <DataList.Value>
                <span className="text-green-500">{product.retailer}</span>
              </DataList.Value>
              <DataList.Label className="font-bold">Price:</DataList.Label>
              <DataList.Value>
                <span className="text-green-500">
                  <img src={product.image} alt="" />
                </span>
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </>
      )}
    </div>
  );
}

export default AdminProductDetail;
