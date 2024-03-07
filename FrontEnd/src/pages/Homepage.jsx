import Carousel from "./../ui/Carousel";
import ShowProduct from "../ui/ShowProduct";

function Homepage() {
  return (
    <div>
      <Carousel />
      <div className="flex justify-around">
        <ShowProduct name={"mens fashion"} />
        <ShowProduct name={"Eletronics"} />
        <ShowProduct name={"accessories"} />
      </div>
    </div>
  );
}

export default Homepage;
