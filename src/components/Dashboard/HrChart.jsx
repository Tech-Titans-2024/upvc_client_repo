import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const HorizontalBarChart = () => {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/product-type-sales');
                const productData = response.data;

                // Prepare data for the chart
                const labels = productData.map(item => item.productType);
                const salesData = productData.map(item => item.totalSales);
                
                setChartData({
                    labels: labels,
                    datasets: [{
                        label: '',
                        data: salesData,
                        backgroundColor: [
                            'rgba(103, 68, 173, 1)',  // Purple for Door
                            'rgba(0, 150, 136, 1)',   // Teal for Window
                            'rgba(244, 67, 54, 1)',    // Red for Louvers
                        ],
                        hoverBackgroundColor: [
                            'rgba(103, 58, 183, 0.8)',  // Dimmer Purple for Door
                            'rgba(0, 150, 136, 0.8)',   // Dimmer Teal for Window
                            'rgba(244, 67, 54, 0.8)',   // Dimmer Red for Louvers
                        ],
                        borderRadius: 8,
                        borderWidth: 3, 
                        borderColor: 'rgba(169, 169, 169, 1)',
                    }],
                });
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching product type sales data:", error);
                setError("Failed to load data. Please try again later.");
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const options = {
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
                text: 'Sales by Product',
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
                formatter: (value) => {
                    return `₹${value.toLocaleString()}`;
                },
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Sales: ₹${context.raw.toLocaleString()}`;
                    }
                }
            }
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
                    callback: function(value) {
                        return `₹${value.toLocaleString()}`;
                    }
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
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg h-96">
            {isLoading ? (
                <div className="flex items-center justify-center h-full">
                    <p>Loading data...</p>
                </div>
            ) : error ? (
                <div className="flex items-center justify-center h-full text-red-500">
                    <p>{error}</p>
                </div>
            ) : chartData ? (
                <Bar data={chartData} options={options} />
            ) : (
                <div className="flex items-center justify-center h-full">
                    <p>No data available</p>
                </div>
            )}
        </div>
    );
};

export default HorizontalBarChart;