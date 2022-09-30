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
import { Totals } from "../../../domain/displays/totals";
import { BankingSystem } from "../../../domain/banking-system";


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
      text: "Accounts",
    },
  },
};

export default function LineChart({ bank }) {
  const selectedBank = BankingSystem.getBankById(bank.cardInfo.id);
  const totals = Totals.getTotalAssetsAndReserves(selectedBank);
  const deposits = [0];
  deposits.push(totals);
  const labels = deposits.map((n) => "");
  const data = {
    labels,
    datasets: [
      {
        label: "Credit",
        data: deposits,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Reserves",
        data: deposits.map(d => d - 5),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
