function SmallCard({ name, icon, number, color }) {
  return (
    <div
      className={`w-50 bg-${color}-400 shadow-lg rounded-2xl text-2xl font-bold flex p-10 h-auto gap-10 mt-10`}
    >
      <div className="flex flex-col">
        <h1 className="text-black">{name}</h1>
        <p className="text-5xl p-1 font-bold text-black">{number}</p>
      </div>
      <div className="text-5xl font-bold">{icon}</div>
    </div>
  );
}

export default SmallCard;
