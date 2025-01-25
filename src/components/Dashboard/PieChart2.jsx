import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart2 = () => 
{
	const chartData = {
		labels: ['Fixed Window - 50', 'Sliding Window - 30', 'Open Window - 20'],
		datasets: [
			{
				data: [50, 30, 20],
				backgroundColor: [
					'#4CAF50', // Green
					'#FFC107', // Amber
					'#2196F3', // Blue
				],
				hoverBackgroundColor: [
					'#388E3C', // Darker Green
					'#FFB300', // Darker Amber
					'#1976D2', // Darker Blue
				],
				borderColor: '#ffffff',
				borderWidth: 2,
			},
		],
	}

	const options = {
		plugins: {
			legend: {
				display: true,
				position: 'bottom',
				labels: {
					color: '#333',
					font: {
						size: 16,
					},
					padding: 25,
					boxWidth: 35,
					boxHeight: 20,
				},
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						const label = context.label || '';
						const value = context.raw || 0;
						return `${label}: ${value}`;
					},
				},
			},
			datalabels: {
				color: '#fff',
				font: {
					size: 14,
					weight: 'bold',
				},
				formatter: (value, context) => {
					const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
					const percentage = ((value / total) * 100).toFixed(1);
					return `${percentage}%`;
				},
			},
		},
		responsive: true,
		maintainAspectRatio: false,
	}

	const containerStyle = {
		width: '100%',
		height: '450px',
		paddingBottom: '60px',
		paddingTop: '20px',
		background: '#fff',
		borderRadius: '15px',
		boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
	}

	return (
		<div style={containerStyle}>
			<h3
				className="pie-heading font-bold mb-2"
				style={{ textAlign: 'center', fontSize: '20px', marginBottom: '15px' }}
			>
				WINDOW
			</h3>
			<Pie data={chartData} options={options} />
		</div>
	)
}

export default PieChart2;
