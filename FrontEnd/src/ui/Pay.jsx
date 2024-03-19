import React from "react";
import { useSelector } from "react-redux";

function Pay({ cartTotalAmount, orderDetails }) {
  const CHAPA_PUBLIC_KEY = "CHAPUBK_TEST-qkKsCk8GpfdV7qDzpfrPIGljiulyOvKE";
  const CHAPA_SECRET_KEY = "CHASECK_TEST-mYpavLWzzLvrfEhy1JNYPr8L3oSMaNXR";
  const tx = Date.now();

  const { fname, lname, email } = orderDetails;
  return (
    <div className="">
      <form
        id="payForm"
        method="POST"
        action="https://api.chapa.co/v1/hosted/pay"
      >
        <input type="hidden" name="public_key" value={CHAPA_PUBLIC_KEY} />
        <input type="hidden" name="tx_ref" value={`negade-tx-${tx}`} />
        <input type="hidden" name="amount" value={cartTotalAmount} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="first_name" value={fname} />
        <input type="hidden" name="last_name" value={lname} />
        <input type="hidden" name="title" value="Let us do this" />
        <input
          type="hidden"
          name="description"
          value="Paying with Confidence with cha"
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
        <input type="hidden" name="meta[title]" value="test" />

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
