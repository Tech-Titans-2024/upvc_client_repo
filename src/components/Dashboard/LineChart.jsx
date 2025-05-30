import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement,
  Title, 
  Tooltip, 
  Legend
);

const MonthlySalesBarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/monthly-sales');
        
        // Handle empty response
        if (!response.data || response.data.length === 0) {
          throw new Error("No sales data available");
        }

        const monthlyData = response.data;

        // Prepare labels (months)
        const labels = monthlyData.map(item => item.month);
        
        // Prepare sales data
        const salesData = monthlyData.map(item => item.totalSales);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Monthly Sales',
              data: salesData,
              backgroundColor: 'rgba(54, 162, 235, 0.7)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
          ]
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching monthly sales data:", error);
        setError(error.response?.data?.error || error.message || "Failed to load data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
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
        text: 'Monthly Sales Overview',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#212529',
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ₹${context.raw.toLocaleString()}`;
          }
        }
      }
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
          callback: function(value) {
            return `₹${value.toLocaleString()}`;
          }
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
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <p>Loading data...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full text-red-500">
          <p>{error}</p>
        </div>
      ) : chartData ? (
        <Chart type='bar' data={chartData} options={options} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p>No data available</p>
        </div>
      )}
    </div>
  );
};

export default MonthlySalesBarChart;