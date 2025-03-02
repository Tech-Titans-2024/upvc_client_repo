import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Product() {
    const [report, setReport] = useState([]);
    const [filteredReport, setFilteredReport] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedVariant, setSelectedVariant] = useState('');
    const [selectedSubVariant, setSelectedSubVariant] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/product-report`);
                setReport(response.data);
                setFilteredReport(response.data);
            } catch (error) {
                console.error('Error fetching product report:', error);
                setError('Failed to fetch product report. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [apiUrl]);

    useEffect(() => {
        let filteredData = report;

        // Filter by search term
        if (searchTerm) {
            filteredData = filteredData.filter(item =>
                item.product.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by selected product
        if (selectedProduct) {
            filteredData = filteredData.filter(item => item.product === selectedProduct);
        }

        // Filter by selected variant
        if (selectedVariant) {
            filteredData = filteredData.filter(item => item.variant === selectedVariant);
        }

        // Filter by selected sub-variant
        if (selectedSubVariant) {
            filteredData = filteredData.filter(item => item.subVariant === selectedSubVariant);
        }

        setFilteredReport(filteredData);
    }, [searchTerm, selectedProduct, selectedVariant, selectedSubVariant, report]);

    if (loading) {
        return <div className="text-center text-lg font-bold">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-lg font-bold text-red-500">{error}</div>;
    }

    return (
        <div className="w-full h-full bg-white p-2">
            <h1 className="font-bold text-center text-2xl mb-4">Product Wise Report</h1>
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-lg">No of Products : {filteredReport.length}</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-80 p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                />
            </div>
            <div className="flex space-x-4 mb-4">
                <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="p-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Products</option>
                    {[...new Set(report.map(item => item.product))].map((product, index) => (
                        <option key={index} value={product}>{product}</option>
                    ))}
                </select>
                <select
                    value={selectedVariant}
                    onChange={(e) => setSelectedVariant(e.target.value)}
                    className="p-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Variants</option>
                    {[...new Set(report.filter(item => item.product === selectedProduct).map(item => item.variant))].map((variant, index) => (
                        <option key={index} value={variant}>{variant}</option>
                    ))}
                </select>
                <select
                    value={selectedSubVariant}
                    onChange={(e) => setSelectedSubVariant(e.target.value)}
                    className="p-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Sub-Variants</option>
                    {[...new Set(report.filter(item => item.variant === selectedVariant).map(item => item.subVariant))].map((subVariant, index) => (
                        <option key={index} value={subVariant}>{subVariant}</option>
                    ))}
                </select>
            </div>
            <table className="w-full bg-white shadow-md rounded-lg border-collapse mt-2 text-center">
                <thead>
                    <tr className="py-6 bg-blue-500 text-white text-lg">
                        <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Brand</th>
                        <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Product</th>
                        <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Type</th>
                        <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Variant</th>
                        <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Sub-Variant</th>
                        <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Total Quantity</th>
                        <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Total Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReport.length > 0 ? (
                        filteredReport.map((item, index) => (
                            <tr key={index} className="uppercase text-center hover:bg-gray-100">
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{item.brand}</td>
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{item.product}</td>
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{item.type}</td>
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{item.variant}</td>
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{item.subVariant}</td>
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{item.totalQuantity}</td>
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{item.totalSales}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={7}
                                className="px-4 py-6 border border-gray-300 text-center"
                            >
                                No Products Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Product;