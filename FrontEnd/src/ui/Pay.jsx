import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function Pay({ cartTotalAmount, orderDetails }) {
  const CHAPA_PUBLIC_KEY = "CHAPUBK_TEST-g4mCZsTlabmVimRnuCDmF2A5eNXZf70g";
  const CHAPA_SECRET_KEY = "CHASECK_TEST-mYpavLWzzLvrfEhy1JNYPr8L3oSMaNXR";

  const { fname, lname, email } = orderDetails;

  const generateUniqueTxRef = () => {
    const tx = Date.now() + Math.random(); // Introduce randomness
    return `AHMED-tx-${tx}787s`;
  };

  const [tx_ref, setTxRef] = useState(generateUniqueTxRef());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTxRef(generateUniqueTxRef()); // Regenerate tx_ref after a delay
    }, 1000); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, [cartTotalAmount, orderDetails]); // Ensure tx_ref is regenerated when cartTotalAmount or orderDetails change

  return (
    <div className="">
      <form
        id="payForm"
        method="POST"
        action="https://api.chapa.co/v1/transaction/initialize"
      >
        <input type="hidden" name="public_key" value={CHAPA_PUBLIC_KEY} />
        <input type="hidden" name="tx_ref" value="chewatatest-666932" />
        <input type="hidden" name="amount" value={cartTotalAmount} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="first_name" value={fname} />
        <input type="hidden" name="last_name" value={lname} />
        <input type="hidden" name="title" value="Let us do this " />
        <input
          type="hidden"
          name="description"
          value="Paying with Confidence with chapa"
        />
        <input
          type="hidden"
          name="logo"
          value="https://chapa.link/asset/images/chapa_swirl.svg"
        />
        <input
          type="hidden"
          name="callback_url"
          value="https://example.com/callbackurl"
        />
        <input
          type="hidden"
          name="return_url"
          value="http://localhost:5173/cart"
        />
        <input type="hidden" name="meta[Ecommerce]" value="test" />

        <button
          type="submit"
          className="w-96 bg-black text-white rounded-lg ml-4"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default Pay;
