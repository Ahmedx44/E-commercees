import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ChapaPayment = ({
  amount,
  currency,
  customer_email,
  customer_phone,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.chapa.co/v1/checkout",
        {
          amount,
          currency,
          customer_email,
          customer_phone,
          description: "Chapa Payment",
          metadata: {
            // Add any metadata you want to include with the payment
            order_id: "123456",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_CHAPA_SECRET_KEY`,
          },
        }
      );

      if (response.status === 200) {
        const { checkout_url } = response.data;
        window.location.href = checkout_url;
      }
    } catch (error) {
      toast.error("Payment failed!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white py-1 px-2 rounded-lg hover:bg-slate-700"
      >
        {loading ? "Loading..." : "Proceed to Payment"}
      </button>
    </form>
  );
};

export default ChapaPayment;
