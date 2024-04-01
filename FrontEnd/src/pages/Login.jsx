// import axios from "axios";
// import { useState } from "react";
// import { Button, Label, TextInput } from "flowbite-react";
// import { jwtDecode } from "jwt-decode";
// import { toast } from "react-hot-toast";
// import { Link } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:3000/api/users/login",
//         { email, password }
//       );
//       const token = response.data.token;
//       localStorage.setItem("token", token);

//       const decodedToken = jwtDecode(token);
//       const role = decodedToken.role;
//       console.log(decodedToken.role);
//       handleRedirect(role);
//       toast.success(`Successfully Logged in`);
//     } catch (err) {
//       toast.error("Failed to login");
//     }
//   };

//   const handleRedirect = (role) => {
//     switch (role) {
//       case "customer":
//         window.location.href = "/homepage";
//         break;
//       case "admin":
//         window.location.href = "/admin";
//         break;
//       case "retailer":
//         window.location.href = "/retailer";
//         break;
//       case "customerAssistance":
//         window.location.href = "/assistance";
//         break;
//       default:
//         // Handle default case or unexpected role
//         break;
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col gap-6 w-full max-w-lg p-8 bg-white rounded-lg shadow-md"
//         style={{ width: "500px" }} // Adjust the width as needed
//       >
//         <div>
//           <Label htmlFor="email1" value="Your email" className="text-2xl" />
//           <TextInput
//             id="email1"
//             type="email"
//             placeholder="name@flowbite.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="text-xl h-12" // Adjust the height and font size of the input
//           />
//         </div>
//         <div>
//           <Label
//             htmlFor="password1"
//             value="Your password"
//             className="text-2xl"
//           />
//           <TextInput
//             id="password1"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="text-xl h-12" // Adjust the height and font size of the input
//           />
//         </div>
//         <div className="flex items-center gap-4">
//           <Label htmlFor="remember" className="text-2xl">
//             Do you want to{" "}
//             <Link to="/signup" className="text-green-600 text-xl">
//               Sign up
//             </Link>
//           </Label>
//         </div>
//         <Button type="submit" className="bg-black text-xl hover:bg-gray-700">
//           Login
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
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
      toast.success(`Successfully Logged in`);
    } catch (err) {
      toast.error("Failed to login");
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
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="max-w-md w-full bg-white shadow- rounded-md overflow-hidden sm:p-10 p-6">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
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
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
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
              placeholder="Password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
