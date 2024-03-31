import { useEffect, useState } from "react";
import axios from "axios";
import Catgory from "../ui/Catgory";
import Price from "../ui/Price";
import ProductCard from "../ui/ProductCard";
import Spinner from "../ui/Spinner";
import Pagination from "../ui/Pagination";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/products?page=${currentPage}&category=${selectedCategory}&price=${selectedPriceRange}`
        );
        setProducts(response.data.data);
        setTotalPages(Math.ceil(response.data.total / response.data.limit));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, selectedCategory, selectedPriceRange]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (category) => {
    const newCategory = category === "All" ? "" : category;
    setSelectedCategory(newCategory);
  };

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-1">
          <div className="mb-8 md:mb-0 mt-10">
            <Catgory
              onCategoryChange={handleCategoryChange}
              selectedCategory={selectedCategory}
            />
          </div>
          <div>
            <Price
              onPriceRangeChange={handlePriceRangeChange}
              selectedPriceRange={selectedPriceRange}
            />
          </div>
        </div>
        <div className="md:col-span-4 relative">
          <div className="sticky top-0 z-10 bg-white py-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="border border-gray-300 rounded-xl px-4 py-5 mb-4 mt-10 w-full mx-10"
            />
          </div>
          {loading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.isArray(filteredProducts) &&
                filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className="mt-8"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductList;
