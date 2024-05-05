import React from "react";

const sizes = {
  small: "text-xl font-bold px-5 py-1  h-12",
  medium: "text-base px-3 py-2",
  large: "text-2xl px-4 py-3",
  custom: "text-2xl px-4 py-3",
};

const colors = {
  white: "bg-white text-slate-950 hover:bg-red-300 hover:shadow-lg-light",
  gray: "bg-gray-200 text-slate-900 hover:bg-gray-300 hover:shadow-lg-light",
  red: "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg-light",
  black: "bg-black text-white hover:bg-gray-700 hover:shadow-lg-light",
  // Add more colors here as needed
};

function Button({ name, size, color = "black" }) {
  const sizeClass = sizes[size];
  const colorClass = colors[color];

  return (
    <button
      className={`rounded-lg ${sizeClass} ${colorClass} bg-indigo-400 hover:bg-indigo-600 `}
    >
      {name}
    </button>
  );
}

export default Button;
