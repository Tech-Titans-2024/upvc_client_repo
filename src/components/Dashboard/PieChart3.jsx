import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart3 = () => {
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/louver-pie-chart-data');
                const louverData = response.data;

                // Prepare labels with quantities
                const labels = louverData.map(item => `${item.variant} (${item.totalQuantity})`);
                const data = louverData.map(item => item.totalQuantity);
                const backgroundColors = [
                    'rgb(255, 99, 132)',  // Vibrant pink
                    'rgb(54, 162, 235)', // Vibrant blue
                    'rgb(255, 206, 86)',  // Vibrant yellow (if needed for additional variants)
                ].slice(0, louverData.length);

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
                console.error("Error fetching louver pie chart data:", error);
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
                    padding: 45,
                    boxWidth: 35,
                    boxHeight: 20,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value} units`;
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
            <h3 className="pie-heading font-bold mb-2" style={{ textAlign: 'center', fontSize: '20px', marginBottom: '15px' }}>
                LOUVERS VARIANT DISTRIBUTION
            </h3>
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

export default PieChart3;