import myImage from "../image/ChapaLogo.png";
function Chapaintro() {
  return (
    <>
      <hr />
      <div className="flex px-96 justify-between gap-36 mt-20">
        <img src={myImage} alt="chapa" srcset="" className="w-96 h-20" />
        <h1 className="roboto text-7xl">
          {" "}
          Make Secure Fast and Realible Payment Using Chapa
        </h1>
      </div>
    </>
  );
}

export default Chapaintro;
