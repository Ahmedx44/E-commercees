import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie() {
  const female = 29;
  const male = 50;
  return (
    <>
      <div className="font-bold shadow-xl bg-white rounded-xl  ">
        <h1 className="p-5 text-center">Gender disrubtion</h1>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: male, label: "Male" },
                { id: 1, value: female, label: "Female" },
              ],
            },
          ]}
          width={400}
          height={200}
          className=""
        />
      </div>
    </>
  );
}
