import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const PieChartDisplay = ({ fieldsData }) => {
  const labels = Object.keys(fieldsData);
  const dataValues = Object.values(fieldsData);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#8e44ad",
          "#27ae60",
          "#e74c3c",
          "#f39c12",
          "#3498db",
          "#2ecc71",
          "#9b59b6"
        ],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChartDisplay;
