import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Homepage from "./pages/Homepage";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
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

const App = () => {
  return (
    <React.StrictMode>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index path="/homepage" element={<Homepage />} />
            <Route path="/productlist" element={<ProductList />} />
            <Route path="/productdetail/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pay" element={<Payment />} />
            <Route path="/history" element={<History />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/admin" element={<PrivateRoute roles={["admin"]} />}>
            <Route path="" element={<Admin />}>
              <Route index path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Product />} />
              <Route path="users" element={<Users />} />
              <Route path="retailers" element={<AdminRetailers />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="useredit" element={<UserEdit />} />
            </Route>
          </Route>

          <Route
            path="/retailer"
            element={<PrivateRoute roles={["retailer"]} />}
          >
            <Route path="" element={<Retailers />} />
          </Route>

          <Route
            path="/assistance"
            element={<PrivateRoute roles={["customerAssistance"]} />}
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
