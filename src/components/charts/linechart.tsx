import { useAppSelector } from "../../app/hooks";
import { selectBanks } from "../../features/banks/banksSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
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
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Credit vs Reserves",
    },
  },
};

export default function LineChart() {
  const { analytics } = useAppSelector(selectBanks);
  const theme = useMantineTheme();

  const labels = analytics.graphs.credit.map(() => "");
  const data = {
    labels,
    datasets: [
      {
        label: "Credit",
        data: analytics.graphs.credit.map((c) => c.total),
        borderColor: theme.colors.pink[7],
        backgroundColor: theme.colors.pink[3],
      },
      {
        label: "Reserves",
        data: analytics.graphs.reserves,
        borderColor: theme.colors.cyan[7],
        backgroundColor: theme.colors.cyan[3],
      },
    ],
  };
  return <Line options={options} data={data} />;
}
