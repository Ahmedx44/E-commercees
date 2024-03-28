import Catgory from "../ui/Catgory";
import Price from "../ui/Price";
import ProductCard from "../ui/ProductCard";
import Spinner from "../ui/Spinner"; // Assuming you have a Spinner component
import { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/products");
        setProducts(response.data.data); // Assuming response.data contains the data object
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="h-screen mt-16">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-start-1 col-end-2 overflow-y-auto fixed top-0 left-0 h-full">
          <div className="p-4 mt-36 flex flex-col w-68">
            <Catgory />
            <Price />
          </div>
        </div>
        <div className="col-start-2 col-end-5 p-4">
          <div className="overflow-y-auto max-h-screen">
            {loading ? ( // Render spinner if loading is true
              <div className="mt-96 mr-96">
                <Spinner />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
                {Array.isArray(products) &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
