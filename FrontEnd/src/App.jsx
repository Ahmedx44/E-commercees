import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Homepage from "./pages/Homepage";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import Admin from "./pages/Admin";
import Assistance from "./pages/Assistance";
import PrivateRoute from "./PrivateRoute";
import Payment from "./pages/Payment";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Product from "./pages/Product";
import Reviews from "./pages/Reviews";
import Users from "./pages/Users";
import AdminRetailers from "./pages/AdminRetailers";
import Retailers from "./pages/Retailers";
import UserEdit from "./pages/UserEdit";
import AdminProductDetail from "./pages/AdminProductDetail";
import AddProduct from "./pages/AddProduct";
import AddRetailer from "./pages/AddRetailer";
import OrderDetail from "./pages/OrderDetail";
import RetProduct from "./pages/RetProduct";
import RetDashboard from "./pages/RetDashboard";
import AddAssistance from "./pages/AddAssistance";
import ProductReview from "./pages/ProductReview";

const App = () => {
  return (
    <React.StrictMode>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Homepage />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/productdetail/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pay" element={<Payment />} />
            <Route path="/history" element={<History />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/admin" element={<PrivateRoute roles={["admin"]} />}>
            <Route path="" element={<Admin />}>
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Product />} />
              <Route path="users" element={<Users />} />
              <Route path="retailers" element={<AdminRetailers />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="useredit" element={<UserEdit />} />
              <Route path="addassistance" element={<AddAssistance />} />
              <Route path="addretailer" element={<AddRetailer />} />
              <Route
                path="productdetail-admin/:id"
                element={<AdminProductDetail />}
              />
              <Route path="orderdetail/:id" element={<OrderDetail />} />
            </Route>
          </Route>

          <Route
            path="/retailer"
            element={<PrivateRoute roles={["retailer"]} />}
          >
            <Route path="" element={<Retailers />}>
              <Route index element={<RetDashboard />} />
              <Route path="products" element={<RetProduct />} />
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="productreview/:id" element={<ProductReview />} />
            </Route>
          </Route>

          <Route
            path="/assistance"
            element={<PrivateRoute roles={["customer assitance"]} />}
          >
            <Route path="" element={<Assistance />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </React.StrictMode>
  );
};

export default App;
