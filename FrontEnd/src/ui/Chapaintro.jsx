import myImage from "../image/ChapaLogo.png";
import { useDispatch, useSelector } from "react-redux";

function Chapaintro() {
  const language = useSelector((state) => state.language.language);
  return (
    <>
      <hr className="w-2/3 mx-auto border-spacing-3" />
      <div className="flex flex-col justify-around md:flex-row items-center   px-6 md:px-0 mt-10 md:mt-20 py-10 h-full">
        <img
          src={myImage}
          alt="chapa"
          className="w-46 md:w-96 h-auto mb-6 md:mb-0"
        />
        <h1 className="roboto text-4xl md:text-7xl text-center md:text-left w-96  ">
          {language === "en"
            ? " Make Secure, Fast, and Reliable Payments Using Chapa"
            : "Chapaን በመጠቀም ደህንነቱ የተጠበቀ፣ ፈጣን እና አስተማማኝ ክፍያዎችን ያድርጉ"}
        </h1>
      </div>
    </>
  );
}

export default Chapaintro;
