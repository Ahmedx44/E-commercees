import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DataList } from "@radix-ui/themes";
import OrderLocationMap from "../ui/OrderLocationMap";
import Spinner from "../ui/Spinner";
import axios from "axios";

function HistoryDetail() {
  let { id } = useParams();
  console.log(id);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:4000/api/orders/${id}`
          );

          setOrder(response.data.data);
          console.log(order);
        } catch (error) {
          console.error("Error fetching order:", error);
          // Handle error
        }
      };

      fetchOrder();
    }
  }, [id]);

  return (
    <div>
      <DataList.Root className=" py-10 px-5  rounded-xl m-5 gap-5">
        <DataList.Item align="center">
          <DataList.Label className="font-bold">Total Amount:</DataList.Label>
          <DataList.Value></DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </div>
  );
}

export default HistoryDetail;
