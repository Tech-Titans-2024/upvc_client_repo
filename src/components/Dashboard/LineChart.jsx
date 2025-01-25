import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, PointElement, LinearScale, Title, Tooltip, Legend, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => 
{
    const data = 
    {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales Person 1',
                data: [10, 20, 30, 50, 40, 60, 70, 90],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.4,
                borderWidth: 2,
            },
            {
                label: 'Sales Person 2',
                data: [20, 80, 50, 40, 70, 90],
                borderColor: 'rgba(203, 202, 55, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                pointBackgroundColor: 'rgba(203, 202, 55, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(153, 102, 255, 1)',
                tension: 0.4,
                borderWidth: 2,
            },
        ],
    };

    const options = 
    {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Sales and Revenue Trends',
                font: {
                    size: 18,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                },
                ticks: {
                    color: '#6B7280',
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                },
                ticks: {
                    color: '#6B7280',
                },
            },
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuad',
        },
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg h-96">
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
