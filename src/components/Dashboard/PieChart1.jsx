import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart1 = () => 
{
	const chartData = {
		labels: ['Main Door - 30', 'Rest Room Door - 30', 'Bedroom Door - 60'],
		datasets: [
			{
				data: [27, 35, 43],
				backgroundColor: [
					'rgb(67, 160, 71)',   
					'rgb(251, 140, 0)',
					'rgb(244, 67, 54)',   
				],
				hoverBackgroundColor: [
					'rgb(56, 142, 60)',   
					'rgb(251, 150, 0)',  
					'rgb(211, 47, 47)',
				],
				borderColor: 'rgba(255, 255, 255, 1)',
				borderWidth: 2,
			},
		],
	}

	const options = 
	{
		plugins: {
			legend: {
				display: true,
				position: 'bottom',
				align: 'center',
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
			<h3 className="pie-heading font-bold mb-2" style={{ textAlign: 'center', fontSize: '20px', marginBottom: '15px' }}>
				DOOR
			</h3>
			<Pie data={chartData} options={options} />
		</div>
	)
}

export default PieChart1;