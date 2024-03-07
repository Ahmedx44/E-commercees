function ShowProduct({ name }) {
  return (
    <div className="bg-slate-500 w-80 my-3 mx-3 h-96 shadow-lg">
      <div className="relative top-80 left-20 text-slate-200 font-bold">
        {name}
      </div>
    </div>
  );
}

export default ShowProduct;
