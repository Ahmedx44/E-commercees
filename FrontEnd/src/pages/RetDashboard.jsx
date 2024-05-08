import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode
import SmallCard from "../ui/SmallCard";
import { FaCartArrowDown, FaProductHunt, FaRegUser } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import RetBasicPie from "../ui/RetBasicPie";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import axios from "axios";

function RetDashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalReview, setTotalReviews] = useState(0);
  const [products, setProducts] = useState(0);
  const [userId, setUserId] = useState(null); // Define userId state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserId(decodedToken.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      // Check if userId is defined
      fetchProductss(userId); // Call fetchProductss with userId
    }
  }, [userId]); // Add userId to dependency array

  const fetchTotalProducts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:4000/api/products");
      const data = await response.json();
      if (data && data.total) {
        setTotalProducts(data.total);
      }
    } catch (error) {
      console.error("Error fetching total products:", error);
    }
  };

  const fetchProductss = async (userId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:4000/api/products/retailer/${userId}`
      );
      setProducts(response.data.data);
      const retailerProducts = response.data.data;

      let totalReviews = 0;

      // Iterate over each product
      for (const product of retailerProducts) {
        const productId = product._id; // Assuming product ID is stored in _id field
        // Fetch product reviews
        const reviewResponse = await axios.get(
          `http://127.0.0.1:4000/api/products/${productId}/reviews`
        );
        // Increment totalReviews by the number of reviews for this product
        totalReviews += reviewResponse.data.data.length;
      }

      // Update state with total reviews
      setTotalReviews(totalReviews);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchTotalProducts();
    fetchProductss();
  }, []);

  return (
    <div className="h-screen rounded-lg">
      <div className="text-2xl p-10 mt-10">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={HiHome}>
            <p className="text-4xl font-bold">Dashboard</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="flex justify-around">
        <SmallCard
          name="Total Reviews"
          number={totalReview}
          icon={<FaCartArrowDown />}
          color={"red"}
        />
        <SmallCard
          name="Total Products"
          number={products.length}
          icon={<FaProductHunt />}
          color={"green"}
        />
      </div>
      <div className="m-10 p-10 grid grid-cols-2 gap-10">
        <RetBasicPie className="col-span-1" retailerId={userId} />
      </div>
    </div>
  );
}

export default RetDashboard;
