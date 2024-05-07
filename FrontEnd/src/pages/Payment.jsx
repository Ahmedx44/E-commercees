import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Pay from "./../ui/Pay"; // Import the Pay component
import { clearCart } from "../store"; // Import the clearCart action
import { v4 as uuidv4 } from "uuid";
import { Label, TextInput, Checkbox } from "flowbite-react";

function Payment() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 220; // Define the shipping cost
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [location, setLocation] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);
  const [tx_ref, setTxRef] = useState("");
  const [tokenn, setToken] = useState();

  const language = useSelector((state) => state.language.language);

  const generateUniqueTxRef = () => {
    const timestamp = Date.now(); // Get the current timestamp
    const randomString = Math.random().toString(36).substring(2, 15); // Generate a random string
    return `${timestamp}-${randomString}`;
  };

  useEffect(() => {
    setTxRef(generateUniqueTxRef()); // Set the initial tx_ref
  }, []); // Run once on component mount

  useEffect(() => {
    // Retrieve token from local storage
    const token = localStorage.getItem("token");
    setToken(tokenn);
    console.log(token);
    if (token) {
      const decodedToken = jwtDecode(token);
      setFname(decodedToken.firstName);
      setLname(decodedToken.lastName);
      setName(decodedToken.userName);
      setId(decodedToken.id);
      setEmail(decodedToken.email);
      setUser(decodedToken); // Set the user object
      setLocation(decodedToken.location);
      console.log(location);
      console.log(decodedToken);
      console.log(name);
    }
  }, [name]); // Run only once on component mount

  console.log(tx_ref);

  const handlePayNow = async () => {
    // Ensure user data is available
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const decodedToken = jwtDecode(token);
    const user = {
      id: decodedToken.id,
      userName: decodedToken.userName,
      email: decodedToken.email,
      location: decodedToken.location,
    };

    // Prepare order details
    const orderDetails = {
      userId: user.id,
      userName: user.userName,
      email: user.email,
      location: location,
      products: cartItems.map((item) => item._id),
      totalAmount: cartTotalAmount + shippingCost, // Include shipping cost
    };

    try {
      // Create the order
      const response = await axios.post(
        "http://127.0.0.1:4000/api/orders/createOrder",
        orderDetails
      );
      console.log("Order creation response:", response.data); // Log response for debugging
      const createdOrder = response.data.order;

      // Clear the cart after creating the order
      dispatch(clearCart());

      // Find the Pay component's form and submit it
      const payForm = document.getElementById("payForm");
      if (payForm) {
        payForm.submit();
      }
    } catch (error) {
      console.error("Error creating order:", error.response); // Log specific error for debugging
    }
  };

  return (
    <div>
      <form className="flex max-w-md flex-col gap-4 mx-auto mt-40 p-4 border rounded-lg shadow-2xl my-36">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="fname" value="First Name" />
          </div>
          <TextInput
            id="fname"
            type="text"
            placeholder={
              language === "en" ? "Enter your first name" : "የመጀመሪያ ስምህን አስገባ"
            }
            value={fname}
            disabled
            onChange={(e) => setFname(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="lname" value="Last Name" />
          </div>
          <TextInput
            id="lname"
            type="text"
            placeholder={
              language === "en" ? "Enter your last name" : "የአያት ስምህን አስገባ"
            }
            value={lname}
            disabled
            onChange={(e) => setLname(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="amount" value="Amount" />
          </div>
          <TextInput
            id="amount"
            type="text"
            placeholder={language === "en" ? "Enter the amount" : "ገንዘቡን አስገባ"}
            value={cartTotalAmount + shippingCost} // Include shipping cost
            disabled
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            disabled
            placeholder={
              language === "en" ? "Enter your email" : "የእርስዎን ኢሜይል ያስገቡ"
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button onClick={handlePayNow}>
          <Pay
            cartTotalAmount={cartTotalAmount}
            tx_ref={tx_ref}
            disabled={tokenn}
            orderDetails={{ fname, lname, email, amount: cartTotalAmount }}
          />
        </button>
      </form>
    </div>
  );
}

export default Payment;
