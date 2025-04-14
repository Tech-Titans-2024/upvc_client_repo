import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Sales() {
    const [report, setReport] = useState([]);
    const [filteredReport, setFilteredReport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedSalesPerson, setSelectedSalesPerson] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/sales-report`);
                setReport(response.data);
                setFilteredReport(response.data);
            } catch (error) {
                console.error('Error fetching sales report:', error);
                setError('Failed to fetch sales report. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [apiUrl]);
    console.log("Sample dates from API:", report.slice(0, 5).map(item => item.date));

    useEffect(() => {
        let filteredData = report;
    
        // Filter by search term (sales person name)
        if (searchTerm) {
            filteredData = filteredData.filter(item =>
                item.sales_person.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    
        // Filter by date range
        if (fromDate || toDate) {
            try {
                const from = fromDate ? new Date(fromDate) : null;
                const to = toDate ? new Date(toDate) : null;
                
                if (to) {
                    // Set time to end of day for 'to' date to include entire day
                    to.setHours(23, 59, 59, 999);
                }
    
                filteredData = filteredData.filter(item => {
                    try {
                        // Parse the item date (DD-MM-YYYY format)
                        const [day, month, year] = item.date.split('-');
                        const itemDate = new Date(`${year}-${month}-${day}`);
                        
                        // Check if the date is valid
                        if (isNaN(itemDate.getTime())) {
                            console.error('Invalid date:', item.date);
                            return false;
                        }
                        
                        return (!from || itemDate >= from) && (!to || itemDate <= to);
                    } catch (e) {
                        console.error('Error parsing item date:', item.date, e);
                        return false;
                    }
                });
            } catch (e) {
                console.error('Error parsing filter dates:', e);
            }
        }
    
        // Filter by selected sales person
        if (selectedSalesPerson) {
            filteredData = filteredData.filter(item => item.sales_person === selectedSalesPerson);
        }
    
        setFilteredReport(filteredData);
    }, [searchTerm, fromDate, toDate, selectedSalesPerson, report]);

    if (loading) {
        return <div className="text-center text-lg font-bold">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-lg font-bold text-red-500">{error}</div>;
    }

    return (
        <div className="w-full h-full bg-white p-2">
            <h1 className="font-bold text-center text-2xl mb-4">Sales Wise Report</h1>
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-lg">No of Sales Entries : {filteredReport.length}</h1>
                <input
                    type="text"
                    placeholder="Search by Sales Person..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-80 p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                />
            </div>
            <div className="flex space-x-4 mb-4">
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="p-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="p-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <select
                    value={selectedSalesPerson}
                    onChange={(e) => setSelectedSalesPerson(e.target.value)}
                    className="p-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Sales Persons</option>
                    {[...new Set(report.map(item => item.sales_person))].map((salesPerson, index) => (
                        <option key={index} value={salesPerson}>{salesPerson}</option>
                    ))}
                </select>
            </div>
            <table className="w-full bg-white shadow-md rounded-lg border-collapse mt-2 text-center">
                <thead>
                    <tr className="py-6 bg-blue-500 text-white text-lg">
                        <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Sales Person</th>
                        <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Date</th>
                        <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Total Orders</th>
                        <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Total Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReport.length > 0 ? (
                        filteredReport.map((item, index) => (
                            <tr key={index} className="uppercase text-center hover:bg-gray-100">
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{item.sales_person}</td>
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{item.date}</td>
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{item.totalOrders}</td>
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{item.totalSales}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={4}
                                className="px-4 py-6 border border-gray-300 text-center"
                            >
                                No Sales Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Sales;