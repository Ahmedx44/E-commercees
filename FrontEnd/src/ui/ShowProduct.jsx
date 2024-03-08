function ShowProduct({ name, image }) {
  return (
    <div className="relative bg-slate-500 w-80 my-3 mx-3 h-96 shadow-lg overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute top-30 left-0 w-full h-full flex items-center justify-center">
        <div className="text-slate-200 font-bold text-center">{name}</div>
      </div>
    </div>
  );
}

export default ShowProduct;
