import React, { useState, useEffect } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Pay from "./../ui/Pay"; // Import the Pay component
import { clearCart } from "../store"; // Import the clearCart action

function Payment() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [user, setUser] = useState("");

  useEffect(() => {
    // Retrieve token from local storage
    const token = localStorage.getItem("token");
    if (token) {
      // Decode token to extract user information
      const decodedToken = jwtDecode(token);
setFname(decodedToken.firstName);
setLname(decodedToken.lastName);
      setEmail(decodedToken.email);
     
    
    }
  }, []); // Run only once on component mount

  const handlePayNow = async () => {
    // Ensure user data is available
    if (!user) {
      toast.error("Failed to place order. Please log in again.");
      return;
    }

    // Prepare order details
    const orderDetails = {
      userId: user.id,
      userName: userName,
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
      const createdOrder = response.data.order;

      // Clear the cart after creating the order
      dispatch(clearCart());

      // Find the Pay component's form and submit it
      const payForm = document.getElementById("payForm");
      if (payForm) {
        payForm.submit();
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order. Please try again.");
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
            orderDetails={{ fname, lname, email, amount: cartTotalAmount }}
          />
        </button>
      </form>
    </div>
  );
}

export default Payment;
