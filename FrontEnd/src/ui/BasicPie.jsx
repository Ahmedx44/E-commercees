import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";

export default function BasicPie({ retailerId }) {
  const [categoryDistribution, setCategoryDistribution] = useState([]);

  useEffect(() => {
    fetchCategoryDistribution();
  }, []);

  const fetchCategoryDistribution = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:4000/api/products`);
      const products = response.data.data;

      // Calculate category distribution
      const categoryCount = {};
      products.forEach((product) => {
        const category = product.category;
        if (category in categoryCount) {
          categoryCount[category] += product.quantity;
        } else {
          categoryCount[category] = product.quantity;
        }
      });

      // Convert category count object to array of objects for pie chart data
      const categoryData = Object.keys(categoryCount).map((category) => ({
        id: category,
        value: categoryCount[category],
        label: category,
      }));

      setCategoryDistribution(categoryData);
    } catch (error) {
      console.error("Error fetching category distribution:", error);
    }
  };

  return (
    <>
      <div className="font-bold shadow-xl bg-white rounded-xl">
        <h1 className="p-5 text-center">Product Category Distribution</h1>
        <PieChart
          series={[
            {
              data: categoryDistribution,
            },
          ]}
          width={400}
          height={200}
          className=""
        />
      </div>
    </>
  );
}
