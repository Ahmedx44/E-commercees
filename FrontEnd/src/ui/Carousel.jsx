import { Carousel } from "flowbite-react";

function CarouselSlide() {
  return (
    <div className="h-80 sm:h-144 xl:h-160 2xl:h-192">
      <Carousel slideInterval={5000}>
        <img
          src="../src/data/pexels-porapak-apichodilok-346748.jpg"
          alt="..."
          className="object-cover w-full h-full"
        />
        <img
          src="../src/data/pexels-porapak-apichodilok-346748.jpg"
          alt="..."
          className="object-cover w-full h-full"
        />
        <img
          src="../src/data/pexels-porapak-apichodilok-346748.jpg"
          alt="..."
          className="object-cover w-full h-full"
        />
        <img
          src="../src/data/pexels-porapak-apichodilok-346748.jpg"
          alt="..."
          className="object-cover w-full h-full"
        />
        <img
          src="../src/data/pexels-porapak-apichodilok-346748.jpg"
          alt="..."
          className="object-cover w-full h-full"
        />
      </Carousel>
    </div>
  );
}

export default CarouselSlide;
