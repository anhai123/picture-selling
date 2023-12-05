import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Doanh thu theo tháng',
        },
    },
};

const labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];

export const data = {
    labels,
    datasets: [
        {
            label: 'VND',
            data: labels.map(() => 2),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export default function BarChart({ option, dataBarChart }) {

    console.log(dataBarChart)
    const data = {
        labels,
        datasets: [
            {
                label: 'VND',
                data: labels.map((val, index) => dataBarChart[index]),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return <Bar options={options} data={data} />;
}
