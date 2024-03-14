// App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Homepage from "./pages/Homepage";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login"; // Import the Login component
import SignUp from "./pages/SignUp"; // Import the SignUp component
import { Toaster } from "react-hot-toast";
import Admin from "./pages/Admin";
import Retailer from "./pages/Retailer";
import Assistance from "./pages/Assistance";
import PrivateRoute from "./PrivateRoute"; // Import the PrivateRoute component

const App = () => {
  return (
    <React.StrictMode>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/admin" element={<PrivateRoute roles={["admin"]} />}>
            <Route path="" element={<Admin />} />
          </Route>

          <Route
            path="/retailer"
            element={<PrivateRoute roles={["retailer"]} />}
          >
            <Route path="" element={<Retailer />} />
          </Route>

          <Route
            path="assistance"
            element={<PrivateRoute roles={["customerAssistance"]} />}
          >
            <Route path="" element={<Assistance />} />
          </Route>

          <Route path="/" element={<AppLayout />}>
            <Route index path="homepage" element={<Homepage />} />
            <Route path="productlist" element={<ProductList />} />
            <Route path="productdetail/:id" element={<ProductDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </React.StrictMode>
  );
};

export default App;
