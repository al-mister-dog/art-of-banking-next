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

// export const options = {
//   responsive: true,
//   scales: {
//     y: {
//       beginAtZero: true,
//     },
//   },
//   plugins: {
//     legend: {
//       position: "top" as const,
//     },
//     title: {
//       display: true,
//       text: "Credit vs Reserves",
//     },
//   },
// };

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
    responsive: true,
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
  return <Line options={options} data={data} />;
}
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       fill: true,
//       label: 'Dataset 2',
//       data: [1, 2, 3, 4, 5, 6, 7],
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

// export function App() {
//   return <Line options={options} data={data} />;
// }
