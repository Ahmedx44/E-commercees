import CategoryFilter from "../ui/CatgoryFilter";
import PriceFilter from "../ui/PriceFilter";
import RatingFilter from "../ui/RatingFilter";

function ProductList() {
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 overflow-y-auto">
        <div className="p-4">
          <PriceFilter />
          <CategoryFilter />
          <RatingFilter />
        </div>
      </div>
      <div className="w-3/4 bg-green-200 overflow-y-auto"></div>
    </div>
  );
}

export default ProductList;
