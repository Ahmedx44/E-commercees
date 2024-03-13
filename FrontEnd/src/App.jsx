import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Homepage from "./pages/Homepage";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart"; // Import the Cart component
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate replace to="homepage" />} />
          <Route path="homepage" element={<Homepage />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="productdetail/:id" element={<ProductDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
