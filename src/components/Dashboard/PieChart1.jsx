import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart1 = () => {
	const [chartData, setChartData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:5001/api/product-report'); // adjust URL if needed
				const productData = response.data;

				// Filter or map to specific door types if needed
				const filtered = productData.filter(item =>
					item.product === 'Door' &&
					['Main Door', 'Rest Room Door', 'Bedroom Door'].includes(item.type)
				);

				const labels = filtered.map(item => `${item.type} - ${item.totalQuantity}`);
				const data = filtered.map(item => item.totalQuantity);

				setChartData({
					labels: labels,
					datasets: [{
						data: data,
						backgroundColor: ['rgb(67, 160, 71)', 'rgb(251, 140, 0)', 'rgb(244, 67, 54)'],
						hoverBackgroundColor: ['rgb(56, 142, 60)', 'rgb(251, 150, 0)', 'rgb(211, 47, 47)'],
						borderColor: 'rgba(255, 255, 255, 1)',
						borderWidth: 2,
					}],
				});
			} catch (error) {
				console.error("Error fetching product data:", error);
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
						const label = context.label || '';
						const value = context.raw || 0;
						return `${label}: ${value}`;
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
				DOOR
			</h3>
			{chartData ? <Pie data={chartData} options={options} /> : <p style={{ textAlign: 'center' }}>Loading...</p>}
		</div>
	);
};

export default PieChart1;
