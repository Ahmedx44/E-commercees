import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../ui/Spinner"; // Import the Spinner component
import { Breadcrumb } from "flowbite-react";
import { HiShoppingBag } from "react-icons/hi";
import "@radix-ui/themes/styles.css";
import { Badge, DataList } from "@radix-ui/themes";

function OrderDetail() {
  const [order, setOrder] = useState(null);
  const { id } = useParams(); // Access the id parameter from the URL

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:3000/api/orders/getorder/${id}`
          );

          setOrder(response.data.data.order);
        } catch (error) {
          console.error("Error fetching order:", error);
          // Handle error
        }
      };

      fetchOrder();
    }
  }, [id]);

  // Render the spinner if order is null
  if (!order) {
    return <Spinner className="mt-96" />;
  }

  // Render order details when order is available
  return (
    <div className="bg-slate-200 h-screen">
      <div className="text-2xl p-10">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="/admin/orders" icon={HiShoppingBag}>
            <p className="text-4xl font-bold">Order</p>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#" icon={HiShoppingBag}>
            <p className="text-4xl font-bold">Order Detail: {order._id}</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="bg-slate-50 py-10 px-5 m-5 rounded-xl text-3xl font-bold flex items-center gap-2">
        Status:
        <select name="" id="" className="rounded-xl w-full p-5">
          <option value="">Processing</option>
          <option value="">Order</option>
          <option value="">Confirm</option>
        </select>
      </div>

      <DataList.Root className="bg-slate-50 py-10 px-5  rounded-xl m-5 gap-5">
        <DataList.Item align="center">
          <DataList.Label minWidth="88px">Order Status</DataList.Label>
          <DataList.Value>
            <Badge color="green" variant="soft" radius="pill">
              Complete
            </Badge>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Payment</DataList.Label>
          <DataList.Value>
            <span className="bg-green-300 px-2 py-1 rounded-lg">Paid</span>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Shipping</DataList.Label>
          <DataList.Value>
            <span className="text-green-500">100ETB</span>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Order Total</DataList.Label>
          <DataList.Value>
            <span className="text-green-500">{order.totalAmount}ETB</span>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Delivery</DataList.Label>
          <DataList.Value>{/* Add delivery information here */}</DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </div>
  );
}

export default OrderDetail;
