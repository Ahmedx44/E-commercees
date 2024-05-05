import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../ui/Spinner"; // Import the Spinner component
import { Breadcrumb } from "flowbite-react";
import { HiShoppingBag } from "react-icons/hi";
import "@radix-ui/themes/styles.css";
import { DataList } from "@radix-ui/themes";
import toast from "react-hot-toast"; // Import toast for notifications
import OrderLocationMap from "../ui/OrderLocationMap";

function AssOrderDetail() {
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(""); // Add state for status
  const [image, setImage] = useState([]); // Correctly initialize the image state
  const { id } = useParams(); // Access the id parameter from the URL

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:4000/api/orders/getorder/${id}`
          );
          const orderData = response.data.data.order;
          setOrder(orderData);
          setStatus(orderData.status);
        } catch (error) {
          console.error("Error fetching order:", error);
          // Handle error
        }
      };

      fetchOrder();
    }
  }, [id]);

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        const productImages = await Promise.all(
          order.products.map(async (productId) => {
            try {
              const productResponse = await axios.get(
                `http://127.0.0.1:4000/api/products/${productId}`
              );
              return productResponse.data.data.image;
            } catch (error) {
              console.log(
                `Error fetching product with ID ${productId}:`,
                error
              );
              return null; // Handle the error by returning null or any other value
            }
          })
        );
        setImage(productImages.filter((image) => image !== null));
      } catch (error) {
        console.error("Error fetching product images:", error);
      }
    };

    if (order) {
      fetchProductImages();
    }
  }, [order]);

  const handleStatusChange = async () => {
    try {
      await axios.patch(`http://127.0.0.1:4000/api/orders/${id}`, {
        status,
      });
      // Update the order status in the local state
      setOrder({ ...order, status });
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  if (!order) {
    return <Spinner className="mt-96" />;
  }

  // Function to determine background color based on status
  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "yellow";
      case "processing":
        return "orange";
      case "completed":
        return "green";
      default:
        return "white";
    }
  };
  return (
    <div className=" h-screen mt-12 roboto">
      <div className="text-2xl p-10">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="/assistance/orders" icon={HiShoppingBag}>
            <p className="text-4xl font-bold">Order</p>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#" icon={HiShoppingBag}>
            <p className="text-4xl font-bold">Order Detail: {order._id}</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <DataList.Root className=" py-10 px-5  rounded-xl m-5 gap-5">
        <DataList.Item align="center">
          <DataList.Label className="font-bold">Total Amount:</DataList.Label>
          <DataList.Value>
            <span className="text-green-500">{order.totalAmount} ETB</span>
          </DataList.Value>
          <DataList.Label minWidth="88px" className="font-bold">
            Payment:
          </DataList.Label>
          <DataList.Value>
            <span className="text-black bg-green-300 p-1 rounded-lg">Paid</span>
          </DataList.Value>
          <DataList.Label minWidth="88px" className="font-bold">
            Shipping Amount:
          </DataList.Label>
          <DataList.Value>
            <span className="text-green-500">100</span>
          </DataList.Value>
          <DataList.Label minWidth="88px" className="font-bold">
            Status:
          </DataList.Label>
          <DataList.Value>
            <span
              className="text-black bg-green-300 p-1 rounded-lg"
              style={{ backgroundColor: getStatusColor() }}
            >
              {status}
            </span>
          </DataList.Value>
          <DataList.Label minWidth="88px" className="font-bold">
            Product Images
          </DataList.Label>
          <DataList.Value>
            <div className="flex flex-wrap gap-10 mt-20">
              {image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="max-w-72 max-h-72 rounded-xl"
                />
              ))}
            </div>
          </DataList.Value>
          <DataList.Label minWidth="88px" className="font-bold">
            Location:
          </DataList.Label>
          <DataList.Value>
            <OrderLocationMap location={order.location} />
          </DataList.Value>
        </DataList.Item>

        {/* Other order details */}
      </DataList.Root>
    </div>
  );
}

export default AssOrderDetail;
