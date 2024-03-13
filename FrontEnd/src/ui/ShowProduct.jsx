import React from "react";

const ShowProduct = ({ name, image }) => {
  return (
    <div className="relative bg-slate-500 w-80 my-3 mx-3 h-96 shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute top-40 left-0 w-full h-full flex items-center justify-center">
        <div className="text-black font-bold text-center">{name}</div>
      </div>
    </div>
  );
};

export default ShowProduct;
