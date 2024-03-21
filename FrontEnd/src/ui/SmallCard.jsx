function SmallCard({ name, icon }) {
  return (
    <div className="w-50 bg-slate-300  shadow-lg rounded-2xl text-2xl font-bold flex p-10 h-auto gap-10 mt-10">
      <div className="flex flex-col">
        <h1>{name}</h1>
        11
      </div>
      <div className="text-5xl">{icon}</div>
    </div>
  );
}

export default SmallCard;
