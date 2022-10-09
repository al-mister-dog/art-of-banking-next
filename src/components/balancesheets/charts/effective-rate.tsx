import { useAppSelector } from "../../../app/hooks";
import { selectBanks } from "../../../features/banks/banksSlice";
import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import "chartjs-plugin-annotation";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

export default function App() {
  const { analytics } = useAppSelector(selectBanks);
  const loanData = analytics.graphs.loanData;
  const labels = loanData.associatedData.map((data) => data.rate);

  const data = {
    labels,
    datasets: [
      // {
      //   type: "bar" as const,
      //   label: "Effective Rate",
      //   borderColor: "white",
      //   borderWidth: 2,
      //   barThickness: 10,
      //   backgroundColor: "black",
      //   data: loanData.associatedData.map((data) => {
      //     if (data.rate === loanData.volumeWeightedMedian) {
      //       return 60;
      //     } else {
      //       return 0;
      //     }
      //   }),
      // },
      {
        type: "bar" as const,
        label: "Transactions by Interest Rate",
        backgroundColor: "rgb(75, 192, 192)",
        data: loanData.associatedData.map((data) => data.volume),
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  return <Chart type="bar" data={data} />;
}
