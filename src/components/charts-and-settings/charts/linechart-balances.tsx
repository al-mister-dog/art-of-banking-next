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
import { Banks } from "../../../domain/bank";
import { bankData } from "../../../domain/structures";

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

export const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Deposits & Reserves",
    },
  },
};

const colors = {
  0: "red",
  1: "green",
  2: "blue",
  3: "yellow",
  4: "grape",
  5: "orange",
  6: "pink",
};
export default function LineChart() {
  const { analytics } = useAppSelector(selectBanks);
  const theme = useMantineTheme();

  const options = {
    responsive: true,
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //     suggestedMax: reservesData[0] * 2,
    //   },
    // },
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

  let labels = [];
  let data = {
    labels,
    datasets: [
      {
        label: "Reserves",
        data: [1],
        borderColor: "pink",
        backgroundColor: "pink",
      },
    ],
  };
  if (Object.keys(analytics.graphs.nationalData).length > 0) {
    labels = analytics.graphs.nationalData[0].map((c, i) => i);
    data = {
      labels,
      datasets: [
        ...Object.keys(analytics.graphs.nationalData).map((bank) => {
          const bData = analytics.graphs.nationalData[bank];
          return {
            label: `${bankData.banks[bank].name} Reserves`,
            data: bData.map((data) => data.reserves),
            borderColor: theme.colors[colors[bank]][9],
            backgroundColor: theme.colors[colors[bank]][7],
          };
        }),
        ...Object.keys(analytics.graphs.nationalData).map((bank) => {
          const bData = analytics.graphs.nationalData[bank];
          return {
            label: `${bankData.banks[bank].name} Deposits`,
            data: bData.map((data) => data.deposits),
            borderColor: theme.colors[colors[bank]][5],
            backgroundColor: theme.colors[colors[bank]][3],
          };
        }),
      ],
    };
  }

  console.log(JSON.stringify(data));
  //   const labels = creditData.map((c, i) => i);
  //   const data = {
  //     labels,
  //     datasets: [
  //       {
  //         label: "Credit",
  //         data: creditData,
  //         borderColor: theme.colors.pink[7],
  //         backgroundColor: theme.colors.pink[3],
  //       },
  //       {
  //         // fill: true,
  //         label: "Reserves",
  //         data: reservesData,
  //         borderColor: theme.colors.cyan[7],
  //         backgroundColor: theme.colors.cyan[3],
  //       },
  //       {
  //         label: "Private Credit",
  //         data: privateCreditData,
  //         borderColor: theme.colors.yellow[7],
  //         backgroundColor: theme.colors.yellow[3],
  //       },
  //     ],
  //   };
  if (Object.keys(analytics.graphs.nationalData).length === 0) {
    return <>Loading...</>;
  }
  return <Line options={options} data={data} />;
  // return <></>;
}
