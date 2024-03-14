import SizeDropdown from "../ui/SizeDropdown";
import ColorDropdown from "../ui/ColorDropDown";
import CategoryDropdown from "../ui/CategoryDropdown";
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
    <div className="h-screen mt-16">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-start-1 col-end-2 overflow-y-auto fixed top-0 left-0 h-full">
          <div className="p-4 mt-20 flex flex-col">
            <SizeDropdown />
            <CategoryDropdown />
            <ColorDropdown />
          </div>
        </div>
        <div className="col-start-2 col-end-5 p-4">
          <div className="overflow-y-auto max-h-screen">
            {" "}
            {/* Modified */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
              {Array.isArray(products) &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
