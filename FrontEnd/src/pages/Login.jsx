import axios from "axios";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Logo from "../image/Screenshot from 2024-05-07 14-20-48.png";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.promise(loginUser(), {
      loading: "Logging in...",
      success: (data) => {
        return (
          <>
            {toast.success(`Successfully Logged in`)}
            {handleRedirect(data.role)}
          </>
        );
      },
      error: (err) => toast.error("Email and Password incorrect"),
    });
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "https://vercel.com/ahmedx44s-projects/backendecommerce/8Qy4iW7hzfvynXQXqDHVREbZSz2G/api/users/login",
        { email, password }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (err) {
      throw err;
    }
  };

  const handleRedirect = (role) => {
    switch (role) {
      case "customer":
        window.location.href = "/";
        break;
      case "admin":
        window.location.href = "/admin";
        break;
      case "retailer":
        window.location.href = "/retailer";
        break;
      case "customer assitance":
        window.location.href = "/assistance";
        break;
      default:
        break;
    }
  };

  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-md overflow-hidden sm:p-10 p-6">
        <div>
          <Link to="/">
            <Button name={language === "en" ? "Home" : "ቤት"} size="medium" />
          </Link>
          <img className="mx-auto w-96 " src={Logo} alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {language === "en" ? "Sign in to your account " : "ወደ መለያዎ ይግቡ"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder={language === "en" ? " Email address" : "የ ኢሜል አድራሻ"}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder={language === "en" ? "Password" : "የይለፍ ቃል"}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-700 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {language === "en" ? " Sign in " : "ይግቡቡ"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className=" text-gray-600 text-xl mt-5">
            {" "}
            {language === "en" ? "Don't have an account?" : "መለያ የለህም?"}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {language === "en" ? "Sign up" : "ተመዝገቢ"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
