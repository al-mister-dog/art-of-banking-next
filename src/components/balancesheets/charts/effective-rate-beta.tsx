import { useAppSelector } from "../../../app/hooks";
import { selectBanks } from "../../../features/banks/banksSlice";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";

Chart.register(annotationPlugin);

export default function EffectiveRate() {
  const { analytics } = useAppSelector(selectBanks);
  const loanData = analytics.graphs.loanData;
  const labels = loanData.associatedData.map((data) => `${data.rate}%`);
  const options = {
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
            borderColor: "black",
            borderWidth: 1,
            scaleID: "x",
            value: loanData.associatedData.findIndex(
              (d) => d.rate === loanData.volumeWeightedMedian
            ),
            label: {
              enabled: true,
              content: "Effective Rate",
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
        label: "Volume Traded",
        backgroundColor: "rgb(75, 192, 192)",
        data: loanData.associatedData.map((data) => data.volume),
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  return <Bar options={options} data={data} height={150} />;
}
