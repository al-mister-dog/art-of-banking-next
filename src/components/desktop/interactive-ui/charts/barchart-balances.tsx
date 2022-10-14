import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useMediaQuery } from "@mantine/hooks";

import { useMantineTheme } from "@mantine/core";
import ChartContainer from "./chart-container";
import { useAppSelector } from "../../../../app/hooks";
import { bankData } from "../../../../domain/structures/objects";
import { selectBanks } from "../../../../features/banks/banksSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart() {
  const { analytics } = useAppSelector(selectBanks);
  const theme = useMantineTheme();

  const banks = Object.keys(analytics.graphs.nationalData).map((id) => {
    return bankData.banks[id];
  });
  let labels = [];
  let deposits = [];
  let reserves = [];
  let max = 200;
  if (Object.keys(analytics.graphs.nationalData).length > 0) {
    labels = banks.map((bank) => bank.name);

    deposits = Object.keys(analytics.graphs.nationalData).map((bank) => {
      const bData =
        analytics.graphs.nationalData[bank][
          analytics.graphs.nationalData[bank].length - 1
        ];
      return bData.deposits;
    });
    reserves = Object.keys(analytics.graphs.nationalData).map((bank) => {
      const bData =
        analytics.graphs.nationalData[bank][
          analytics.graphs.nationalData[bank].length - 1
        ];
      return bData.reserves;
    });
  }
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Balances",
        color: theme.colors.violet[9],
      },
    },
    scales: {
      y: {
        suggestedMax: max,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Deposits",
        data: deposits,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Reserves",
        data: reserves,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <ChartContainer>
      <Bar options={options} data={data} />
    </ChartContainer>
  );
}
