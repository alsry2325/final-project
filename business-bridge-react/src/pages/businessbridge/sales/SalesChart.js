import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {Bar} from "react-chartjs-2";

const SalesChart = ({ data }) => {

    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const chartData = {
        labels: data.map(item => item.emply_name),
        datasets: [{
            label: '누적 완결수',
            data: data.map(item => item.count),
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
        }],
    };

    return <Bar data={chartData} />;
};

export default SalesChart;