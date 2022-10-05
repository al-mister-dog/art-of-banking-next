import { useAppSelector } from "../../../app/hooks";
import { selectBanks } from "../../../features/banks/banksSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMantineTheme } from "@mantine/core";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function LineChart() {
  const { analytics } = useAppSelector(selectBanks);

  const theme = useMantineTheme();
  let creditData = [];
  let reservesData = [];
  if (analytics.graphs.credit.length === 0) {
    creditData = [0];
    reservesData = [0];
  } else {
    creditData = [analytics.graphs.credit[0], ...analytics.graphs.credit];
    reservesData = [analytics.graphs.reserves[0], ...analytics.graphs.reserves];
  }

  const options = {
    // responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: reservesData[0] * 2,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Credit vs Reserves",
        color: theme.colors.violet[9]
      },
    },
  };

  const labels = creditData.map((c, i) => i);
  const data = {
    labels,
    datasets: [
      {
        label: "Credit",
        data: creditData,
        borderColor: theme.colors.pink[7],
        backgroundColor: theme.colors.pink[3],
      },
      {
        label: "Reserves",
        data: reservesData,
        borderColor: theme.colors.cyan[7],
        backgroundColor: theme.colors.cyan[3],
      },
    ],
  };

  if (analytics.graphs.credit.length === 0) {
    return <>Waiting For Graph Data</>;
  }
  // return <Line options={options} data={data} />;


  return (
    <div style={{height: "25.5rem", width: "100%"}}>
      <Line options={options} data={data} />
    </div>
  )
}
