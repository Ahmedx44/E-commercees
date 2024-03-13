import Carousel from "./../ui/Carousel";
import ShowProduct from "../ui/ShowProduct";

function Homepage() {
  return (
    <div>
      <div className="bg-black p-20 mt-24 text-center text-white font-bold">
        <h1 className="text-4xl font-bold text-white ">Home</h1>
      </div>
      <Carousel />
      <div className="flex flex-wrap justify-center sm:justify-around bg-black">
        <ShowProduct
          name={"Fashion"}
          image={"../src/data/pexels-porapak-apichodilok-346748.jpg"}
        />
        <ShowProduct
          name={"Eletronics"}
          image={"../src/data/pexels-porapak-apichodilok-346748.jpg"}
        />
        <ShowProduct
          name={"Accessories"}
          image={"../src/data/pexels-porapak-apichodilok-346748.jpg"}
        />
      </div>
    </div>
  );
}

export default Homepage;
