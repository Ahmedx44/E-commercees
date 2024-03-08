import Carousel from "./../ui/Carousel";
import ShowProduct from "../ui/ShowProduct";

function Homepage() {
  return (
    <div>
      <Carousel />
      <div className="flex flex-wrap justify-center sm:justify-around">
        <ShowProduct
          name={"mens fashion"}
          image={"../src/data/pexels-porapak-apichodilok-346748.jpg"}
        />
        <ShowProduct
          name={"Eletronics"}
          image={"../src/data/pexels-porapak-apichodilok-346748.jpg"}
        />
        <ShowProduct
          name={"accessories"}
          image={"../src/data/pexels-porapak-apichodilok-346748.jpg"}
        />
      </div>
    </div>
  );
}

export default Homepage;
