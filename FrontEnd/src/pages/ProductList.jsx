import { useEffect, useState } from "react";
import axios from "axios";
import Catagory from "../ui/Catagory";
import Price from "../ui/Price";
import ProductCard from "../ui/ProductCard";
import Spinner from "../ui/Spinner";
import Pagination from "../ui/Pagination";
import { CiSearch } from "react-icons/ci";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPriceBelow, setShowPriceBelow] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/api/products?page=${currentPage}&category=${selectedCategory}&price=${selectedPriceRange}`
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
    setShowPriceBelow(false); // Close the Price dropdown when category changes
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
    <div className="w-screen">
      <div className="p-32 mt-24 text-center text-white bg-indigo-700 font-bold w-full ">
        <h1 className="text-4xl font-bold ">Shop</h1>
        <p>Home | Shop</p>
      </div>
      <div className="container px-4 mt-15 py-16 md:px-8 md:py-24 lg:px-16 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 align-center">
          <div className="md:col-span-2">
            <div className="mb-8 md:mb-0 mt-10">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="border-none bg-indigo-200 rounded-full mb-4 w-3/4 text-2xl roboto focus:border-none focus:outline-none"
                />
                <CiSearch className="w-20 h-10 mt-1 -mx-20" />
              </div>
              <Catagory
                onCategoryChange={handleCategoryChange}
                selectedCategory={selectedCategory}
                setShowPriceBelow={setShowPriceBelow}
              />
              <Price
                onPriceRangeChange={handlePriceRangeChange}
                selectedPriceRange={selectedPriceRange}
                showBelow={showPriceBelow}
              />
            </div>
          </div>
          <div className="md:col-span-4 relative p-10 rounded-xl">
            <div className="top-0 z-10 bg-white py-4 "></div>
            {loading ? (
              <div className="flex gap-20">
                <div className="flex flex-col gap-4 w-96">
                  <div className="skeleton h-96 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex flex-col gap-4 w-96">
                  <div className="skeleton h-96 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex flex-col gap-4 w-96">
                  <div className="skeleton h-96 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-20 mt-10">
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
