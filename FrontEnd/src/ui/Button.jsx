function Button({ name }) {
  return (
    <button className="p-5 text-slate-950 bg-white rounded-lg text-2xl hover:bg-red-300 hover:shadow-lg-light">
      {name}
    </button>
  );
}

export default Button;
