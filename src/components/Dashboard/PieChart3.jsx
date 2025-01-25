import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart3 = () => 
{
	const chartData = {
		labels: ['Louvers with Fan - 60', 'Louvers without Fan - 40'],		
		datasets: [
			{
				data: [60, 40],
				backgroundColor: [
					'#FF6384', // Vibrant pink
					'#36A2EB', // Vibrant blue
					'#32A2EB', // Vibrant blue
				],
				hoverBackgroundColor: [
					'#FF6384', // Vibrant pink
					'#36A2EB', // Vibrant blue
					'#32A2EB', // Vibrant blue
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
				LOUVERS
			</h3>
			<Pie data={chartData} options={options} />
		</div>
	)
}

export default PieChart3;
