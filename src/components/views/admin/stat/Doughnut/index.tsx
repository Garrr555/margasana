import { Doughnut } from "react-chartjs-2";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  
  LineElement,
  PointElement,
  
  Title,
  Tooltip,
  Legend,
  
);

const DoughnutChart = () => {
  const data = {
    labels: ["Red", "Blue", "Green"],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ["#ef4444", "#3b82f6", "#10b981"],
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default DoughnutChart;
