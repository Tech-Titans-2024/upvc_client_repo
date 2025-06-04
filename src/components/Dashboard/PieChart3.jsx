import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const LouverSalesPieChart = () => {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/louver-sales-data');
                const louverSalesData = response.data;

                // Filter for the top 3 louver variants by sales (or all if less than 3)
                const topLouverVariants = louverSalesData.slice(0, 3);

                // Prepare labels with sales amounts
                const labels = topLouverVariants.map(item => `${item.variant} (₹${item.totalSales.toLocaleString()})`);
                const data = topLouverVariants.map(item => item.totalSales);
                const backgroundColors = [
                    'rgb(65, 105, 225)', // Royal Blue
                    'rgb(255, 127, 80)', // Coral
                    'rgb(65, 105, 225)'  // Royal Blue (repeated for 3rd slice if needed)
                ].slice(0, topLouverVariants.length);

                setChartData({
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: backgroundColors,
                        hoverBackgroundColor: backgroundColors.map(color => 
                            color.replace(/rgb\((\d+), (\d+), (\d+)\)/, (match, r, g, b) => 
                                `rgb(${Math.max(0, r - 20)}, ${Math.max(0, g - 20)}, ${Math.max(0, b - 20)})`
                            )
                        ),
                        borderColor: 'rgba(255, 255, 255, 1)',
                        borderWidth: 2,
                    }],
                });
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching louver sales data:", error);
                setError("Failed to load data. Please try again later.");
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                align: 'center',
                labels: {
                    color: '#333',
                    font: { size: 16 },
                    padding: 25,
                    boxWidth: 35,
                    boxHeight: 20,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label.split(' (')[0] || '';
                        const value = context.raw || 0;
                        return `${label}: ₹${value.toLocaleString()}`;
                    },
                },
            },
            datalabels: {
                color: '#fff',
                font: { size: 14, weight: 'bold' },
                display: (context) => true,
                formatter: (value, context) => {
                    const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${percentage}%`;
                },
            },
            title: {
                display: true,
                text: 'LOUVER SALES DISTRIBUTION',
                font: {
                    size: 20,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 20
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    const containerStyle = {
        width: '100%',
        height: '450px',
        paddingBottom: '60px',
        paddingTop: '20px',
        background: '#fff',
        borderRadius: '15px',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
    };

    return (
        <div style={containerStyle}>
            {isLoading ? (
                <p style={{ textAlign: 'center' }}>Loading data...</p>
            ) : error ? (
                <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
            ) : chartData ? (
                <Pie data={chartData} options={options} />
            ) : (
                <p style={{ textAlign: 'center' }}>No data available</p>
            )}
        </div>
    );
};

export default LouverSalesPieChart;