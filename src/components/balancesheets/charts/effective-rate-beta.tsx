import { useAppSelector } from "../../../app/hooks";
import { selectBanks } from "../../../features/banks/banksSlice";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { useMantineTheme } from "@mantine/core";

Chart.register(annotationPlugin);

export default function EffectiveRate() {
  const { analytics } = useAppSelector(selectBanks);
  const theme = useMantineTheme();
  const loanData = analytics.graphs.loanData;
  const labels = loanData.associatedData.map((data) => `${data.rate}%`);
  const options = {
    maintainAspectRatio: true,
    scales: {
      y: {
        // beginAtZero: true,
        title: {
          display: true,
          text: "Dollars",
        },
      },
      x: {
        // beginAtZero: true,
        title: {
          display: true,
          text: "Interest Rates",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        label: {
          enabled: true,
          content: "Effective Rate",
        },
      },
      annotation: {
        annotations: [
          {
            id: "a-line-1",
            type: "line" as const, // important, otherwise typescript complains
            backgroundColor: theme.colors.violet[3],
            borderColor: theme.colors.violet[3],
            borderWidth: 2,
            scaleID: "x",
            borderDash: [2, 2],
            value: loanData.associatedData.findIndex(
              (d) => d.rate === loanData.volumeWeightedMedian
            ),
            label: {
              display: true,
              content: `EFFR: ${loanData.volumeWeightedMedian}%`,
              position: "start" as const,
              backgroundColor: theme.colors.violet[3],
            },
          },
        ],
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        type: "bar" as const,
        label: "Fed Funds",
        backgroundColor: theme.colors.blue[7],
        data: loanData.associatedData.map((data) => data.volume),
        borderColor: theme.colors.blue[0],
        borderWidth: 2,
      },
      {
        type: "line" as const,
        label: "Cumulative Dollar Weight",
        backgroundColor: theme.colors.violet[7],
        data: loanData.associatedData.map((data) => data.cumulativeFrequency),
        borderColor: theme.colors.violet[7],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ height: "25.5rem", width: "100%" }}>
      <Bar options={options} data={data} height={180} />
    </div>
  );
}
