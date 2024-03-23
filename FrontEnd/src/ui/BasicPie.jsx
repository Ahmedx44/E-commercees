import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie() {
  const female = 29;
  const male = 50;
  return (
    <>
      <h1 className="font-bold">Gender disrubtion</h1>
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
      />
    </>
  );
}
