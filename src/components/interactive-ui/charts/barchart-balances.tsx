import { useAppSelector } from "../../../app/hooks";
import { selectBanks } from "../../../features/banks/banksSlice";
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
import { bankData } from "../../../domain/structures";
import { useMediaQuery } from "@mantine/hooks";
import { mediaQuery } from "../../../config/media-query";
import { useMantineTheme } from "@mantine/core";

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
  const theme = useMantineTheme()
  const isMobile = useMediaQuery(mediaQuery);
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
    maintainAspectRatio: isMobile ? false : true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Balances",
        color: theme.colors.violet[9]
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
    <div style={{ height: "25.5rem", width: "100%" }}>
      <Bar options={options} data={data} />
    </div>
  );
}