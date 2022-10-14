import { useAppSelector } from "../../../../app/hooks";
import { selectBanks } from "../../../../features/banks/banksSlice";
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
import ChartContainer from "./chart-container";

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
  let privateCreditData = [];
  if (analytics.graphs.credit.length === 0) {
    creditData = [0];
    reservesData = [0];
    privateCreditData = [0];
  } else {
    creditData = [analytics.graphs.credit[0], ...analytics.graphs.credit];
    reservesData = [analytics.graphs.reserves[0], ...analytics.graphs.reserves];
    if (analytics.graphs.privateCredit.length > 0)
      privateCreditData = [
        analytics.graphs.privateCredit[0],
        ...analytics.graphs.privateCredit,
      ];
  }

  const options = {
    // responsive: true,
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
        text: "Private Credit vs Reserves",
        color: theme.colors.violet[9],
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
        // fill: true,
        label: "Reserves",
        data: reservesData,
        borderColor: theme.colors.cyan[7],
        backgroundColor: theme.colors.cyan[3],
      },
      {
        label: "Private Credit",
        data: privateCreditData,
        borderColor: theme.colors.yellow[7],
        backgroundColor: theme.colors.yellow[3],
      },
    ],
  };
  return (
    <ChartContainer>
      <Line options={options} data={data} />
    </ChartContainer>
  );
}
