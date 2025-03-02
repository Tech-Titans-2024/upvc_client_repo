import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Period() {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/confirmed-orders`);
                setOrders(response.data);
                setFilteredOrders(response.data);
            } catch (error) {
                console.error('Error fetching confirmed orders:', error);
                setError('Failed to fetch confirmed orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [apiUrl]);

    useEffect(() => {
        let filteredData = orders;

        // Filter by date range
        if (startDate && endDate) {
            filteredData = filteredData.filter(order => {
                const orderDate = new Date(order.date).getTime(); // Convert to timestamp
                const start = new Date(startDate).getTime(); // Convert to timestamp
                const end = new Date(endDate).getTime(); // Convert to timestamp
                return orderDate >= start && orderDate <= end;
            });
        }

        setFilteredOrders(filteredData);
    }, [startDate, endDate, orders]);

    if (loading) {
        return <div className="text-center text-lg font-bold">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-lg font-bold text-red-500">{error}</div>;
    }

    return (
        <div className="w-full h-full bg-white p-2">
            <h1 className="font-bold text-center text-2xl mb-4">Period Wise Report</h1>
            <div className="flex space-x-4 mb-4">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="p-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="p-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <table className="w-full bg-white shadow-md rounded-lg border-collapse mt-2 text-center">
                <thead>
                    <tr className="py-6 bg-blue-500 text-white text-lg">
                        <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Order ID</th>
                        <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Date</th>
                        <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Customer Name</th>
                        <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Total Quantity</th>
                        <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Total Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order, index) => (
                            <tr key={index} className="uppercase text-center hover:bg-gray-100">
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{order.orderId}</td>
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{new Date(order.date).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{order.customerName}</td>
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{order.totalQuantity}</td>
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{order.totalSales}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="px-4 py-6 border border-gray-300 text-center"
                            >
                                No Orders Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Period;