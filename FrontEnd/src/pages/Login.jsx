import axios from "axios";
import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/users/login",
        { email, password }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      console.log(decodedToken.role);
      handleRedirect(role);
      toast.success(`succesfully Logged in`);
    } catch (err) {
      toast.error("failed to login");
    }
  };

  const handleRedirect = (role) => {
    switch (role) {
      case "customer":
        window.location.href = "/homepage";
        break;
      case "admin":
        window.location.href = "/admin";
        break;
      case "retailer":
        window.location.href = "/retailer";
        break;
      case "customerAssistance":
        window.location.href = "/assistance";
        break;
      default:
        // Handle default case or unexpected role
        break;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-lg p-8 bg-white rounded-lg shadow-md"
        style={{ width: "500px" }} // Adjust the width as needed
      >
        <div>
          <Label htmlFor="email1" value="Your email" className="text-2xl" />
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-xl h-12" // Adjust the height and font size of the input
          />
        </div>
        <div>
          <Label
            htmlFor="password1"
            value="Your password"
            className="text-2xl"
          />
          <TextInput
            id="password1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-xl h-12" // Adjust the height and font size of the input
          />
        </div>
        <div className="flex items-center gap-4">
          <Label htmlFor="remember" className="text-2xl">
            Do you want to{" "}
            <Link to="/signup" className="text-green-600 text-xl">
              Sign up
            </Link>
          </Label>
        </div>
        <Button type="submit" className="bg-black text-xl hover:bg-gray-700">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
