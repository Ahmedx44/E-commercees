import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://127.0.0.1:3000/api/users/register", {
        userName: userName.trim(), // trim whitespace from userName
        email,
        password,
        passwordConfirm,
        phoneNumber: phoneNumber.trim(), // trim whitespace from phoneNumber
      });
      console.log("User registered successfully");
      toast.success(`successfully registered`);
      window.location.href = "/login";
      // Redirect to login page
    } catch (error) {
      setError(error.response.data.message);
      toast.error("failed to register");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      <form
        className="max-w-md w-full p-6 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <Label
            htmlFor="userName"
            value="Username"
            className="text-xl font-bold"
          />
          <TextInput
            id="userName"
            type="text"
            placeholder="Enter your username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="text-xl font-bold"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="email1" value="Email" className="text-xl font-bold" />
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-xl font-bold"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="password1"
            value="Password"
            className="text-xl font-bold"
          />
          <TextInput
            id="password1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="confirmPassword"
            value="Confirm Password"
            className="text-xl font-bold"
          />
          <TextInput
            id="confirmPassword"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="phoneNumber"
            value="Phone Number"
            className="text-xl font-bold"
          />
          <TextInput
            id="phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="login" className="text-xl font-bold">
            {"Do you want to "}
            <Link to="/login" className="text-green-600">
              Login
            </Link>
          </Label>
        </div>
        <Button type="submit" className="bg-black hover:bg-gray-900">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
