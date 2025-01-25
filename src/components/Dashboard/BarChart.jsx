import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const BarChart = () => 
{
    const data = 
    {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ],
        datasets: [
            {
                label: 'Target Sales',
                data: [15, 20, 10, 12, 18, 15, 25, 20, 22, 24, 23, 25],
                backgroundColor: 'rgba(75, 240, 192, 0.7)', // Light Green for Target
                borderColor: 'rgba(75, 192, 192, 1)', // Solid green
                borderWidth: 1,
            },
            {
                label: 'Actual Sales',
                data: [12, 19, 8, 10, 16, 12, 22, 18, 20, 23, 21, 23],
                backgroundColor: 'rgba(153, 110, 255, 0.7)', // Purple for Actual
                borderColor: 'rgba(153, 102, 255, 1)', // Solid purple
                borderWidth: 1,
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
                text: 'Target vs Actual Sales Data (12 Months)',
            },
            tooltip: {
                enabled: true,
            },
            datalabels: {
                display: true,
                color: '#000',
                font: {
                    size: 12,
                },
                anchor: 'center', 
                align: 'center', 
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#333',
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#333',
                },
            },
        },
    };

    return (
        <div className="h-96 w-full p-4 rounded-lg shadow-lg bg-white">
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarChart;
