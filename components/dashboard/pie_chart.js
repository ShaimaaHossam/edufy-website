import React, {useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  
);
export const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
 

export default function PieChart({ classData}) {
  const data = {
    labels: ['Attentive', 'Inattentive', 'Sleepy', 'Confused'],
    datasets: [
      {
          label:'',
          data: classData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
    ],
  };
  
  return <Bar options={options}  data={data} />;
}
