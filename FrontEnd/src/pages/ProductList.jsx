import CategoryFilter from "../ui/CatgoryFilter";
import PriceFilter from "../ui/PriceFilter";
import RatingFilter from "../ui/RatingFilter";
import ProductCard from "../ui/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/products");
        setProducts(response.data.data); // Assuming response.data contains the data object
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="bg-black p-20 mt-24 text-center text-white font-bold">
        <h1 className="text-4xl font-bold text-white ">Shop</h1>
        <p>Home | Shop</p>
      </div>
      <div className="flex h-screen mt-16">
        <div className="w-1/4  overflow-y-auto ">
          <div className="p-4 mt-20 flex flex-col">
            <PriceFilter className="mb-4 " />
            <CategoryFilter className="mb-4" />
            <RatingFilter className="mb-4" />
          </div>
        </div>
        <div className="w-3/4 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
          {Array.isArray(products) &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
    </>
  );
}

export default ProductList;
