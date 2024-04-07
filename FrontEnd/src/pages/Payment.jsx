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
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [id, setId] = useState();

  const generateUniqueTxRef = () => {
    const timestamp = Date.now(); // Get the current timestamp
    const randomString = Math.random().toString(36).substring(2, 15); // Generate a random string
    return `${timestamp}-${randomString}`;
  };

  const [tx_ref, setTxRef] = useState(String(generateUniqueTxRef()));
  useEffect(() => {
    const timer = setTimeout(() => {
      setTxRef(String(generateUniqueTxRef())); // Regenerate tx_ref after a delay
    }, 1000); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []); // Run once on component mount to set the initial tx_ref

  useEffect(() => {
    // Retrieve token from local storage
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setFname(decodedToken.firstName);
      setLname(decodedToken.lastName);
      setName(decodedToken.userName);
      setId(decodedToken.id);
      setEmail(decodedToken.email);
      console.log(decodedToken);
      console.log(name);
    }
  }, [name]); // Run only once on component mount
  console.log(tx_ref);
  const handlePayNow = async () => {
    // Ensure user data is available

    // Prepare order details
    const orderDetails = {
      userId: id,
      userName: name,
      email,
      products: cartItems.map((item) => item._id),
      totalAmount: cartTotalAmount,
    };

    try {
      // Create the order
      const response = await axios.post(
        "http://127.0.0.1:3000/api/orders/createOrder",
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
      <form className="flex max-w-md flex-col gap-4 mx-auto mt-40 p-4 border rounded-lg shadow-lg bg-white">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="fname" value="First Name" />
          </div>
          <TextInput
            id="fname"
            type="text"
            placeholder="Enter your first name"
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
            disabled
            placeholder="Enter your last name"
            value={lname}
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
            placeholder="Enter the amount"
            value={cartTotalAmount}
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
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <button onClick={handlePayNow}>
          <Pay
            cartTotalAmount={cartTotalAmount}
            tx_ref={tx_ref}
            orderDetails={{ fname, lname, email, amount: cartTotalAmount }}
          />
        </button>
      </form>
    </div>
  );
}

export default Payment;
