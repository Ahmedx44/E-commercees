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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/products?page=${currentPage}`
        );
        setProducts(response.data.data);
        setTotalPages(Math.ceil(response.data.total / response.data.limit));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
            {loading ? (
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductList;
