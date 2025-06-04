import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement,
  LineElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement,
  LineElement,
  Title, 
  Tooltip, 
  Legend
);

const SalesBySalespersonChart = () => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/sales-by-salesperson');
        
        // Handle empty response
        if (!response.data || response.data.length === 0) {
          throw new Error("No sales data available");
        }

        const salespersonData = response.data;

        // Prepare labels (salesperson names)
        const labels = salespersonData.map(item => item.sales_person);
        
        // Prepare sales data
        const salesData = salespersonData.map(item => item.totalSales);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Total Sales by Salesperson',
              data: salesData,
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              tension: 0.1,
              pointRadius: 8,
              pointHoverRadius: 10
            }
          ]
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching salesperson sales data:", error);
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
        text: 'Sales Performance by Salesperson',
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
        <Chart type='line' data={chartData} options={options} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <p>No data available</p>
        </div>
      )}
    </div>
  );
};

export default SalesBySalespersonChart;