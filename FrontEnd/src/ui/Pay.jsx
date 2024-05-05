import React from "react";

function Pay({ cartTotalAmount, orderDetails, tx_ref }) {
  const CHAPA_PUBLIC_KEY = "CHAPUBK_TEST-R7plWake1SKHPgWOgmzVXAdkH3eiKhT6";

  console.log(tx_ref);
  const { fname, lname, email } = orderDetails;

  return (
    <div className="">
      <form
        id="payForm"
        method="POST"
        action="https://api.chapa.co/v1/hosted/pay"
      >
        <input type="hidden" name="public_key" value={CHAPA_PUBLIC_KEY} />
        <input type="hidden" name="tx_ref" value={tx_ref} />
        <input type="hidden" name="amount" value={cartTotalAmount} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="first_name" value={fname} />
        <input type="hidden" name="last_name" value={lname} />
        <input type="hidden" name="title" value="Ethio-Bazaar " />
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
          className={`w-96 bg-indigo-400 hover:bg-indigo-800 text-white rounded-lg ml-4 ${
            cartTotalAmount === 0
              ? "disabled:opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={cartTotalAmount === 0}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default Pay;
