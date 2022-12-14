import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {Chart as ChartJS}  from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
ChartJS.register (CategoryScale)


export const BarChart:React.FC<{chartdata:any}> = ({chartdata}) => {
   return(
    <Bar data={chartdata} />
   )
}

export const LineChart:React.FC<{chartdata:any}> = ({chartdata}) => {
   return(
    <Line data={chartdata} />
   )
}

export const DoughnutChart:React.FC<{chartdata:any}> = ({chartdata}) => {
   return(
    <Doughnut data={chartdata} />
   )
}

