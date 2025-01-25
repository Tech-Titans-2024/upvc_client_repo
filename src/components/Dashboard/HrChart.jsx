import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const HorizontalBarChart = () => 
{
    const data = 
    {
        labels: ['Door', 'Window', 'Louvers'],
        datasets: [
            {
                label: '',
                data: [65, 95, 80],
                backgroundColor: [
                    'rgba(103, 68, 173, 1)',  // Purple for Door
                    'rgba(0, 150, 136, 1)',   // Teal for Window
                    'rgba(244, 67, 54, 1)',   // Red for Louvers
                ],
                hoverBackgroundColor: [
                    'rgba(103, 58, 183, 0.8)',  // Dimmer Purple for Door
                    'rgba(0, 150, 136, 0.8)',   // Dimmer Teal for Window
                    'rgba(244, 67, 54, 0.8)',   // Dimmer Red for Louvers
                ],
                borderRadius: 8,
                borderWidth: 3, 
                borderColor: 'rgba(169, 169, 169, 1)',
            },
        ],
    }

    const options = 
    {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: 'top',
                labels: {
                    color: '#495057',
                    font: {
                        size: 14,
                        weight: '600',
                    },
                },
            },
            title: {
                display: true,
                text: 'Sales by Product Type',
                font: {
                    size: 24,
                    weight: 'bold',
                },
                padding: {
                    top: 20,
                    bottom: 20,
                },
                color: '#212529',
            },
            datalabels: {
                display: true,
                color: 'white', 
                align: 'center',
                font: {
                    weight: 'bold',
                    size: 16,
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                    borderDash: [5, 5],
                },
                ticks: {
                    color: '#6C757D',
                    font: {
                        size: 14,
                    },
                },
            },
            y: {
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                    borderDash: [5, 5],
                },
                ticks: {
                    color: '#6C757D',
                    font: {
                        size: 14,
                    },
                },
            },
        },
        animation: {
            duration: 1200,
            easing: 'easeOutQuart',
        },
    }

    return (
        <div className="p-6 bg-light rounded-lg shadow-lg h-96">
            <Bar data={data} options={options} />
        </div>
    )
}

export default HorizontalBarChart;