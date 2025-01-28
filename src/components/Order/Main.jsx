import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Main() 
{
    const [quotations, setQuotations] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('Unconfirmed');
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchQuotationDetails = async () => {
            try {
                const response = await axios.post(`${apiUrl}/api/quotationsDetails`, { selectedStatus });
                setQuotations(response.data);
            }
            catch (error) { console.error(error) }
        }
        fetchQuotationDetails()
    }, [apiUrl, selectedStatus])

    const handleChange = (event) => { setSelectedStatus(event.target.value) }

    const confirmOrder = async (order) => {
        try {
            await axios.post(`${apiUrl}/orderconfirm`, order);
            alert('Order Confirmed successfully!');
            window.location.reload()
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full h-full bg-white p-2">
            <h1 className="font-bold text-center text-2xl mb-4">Order Confirmation Details</h1>
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-lg">No of Quotations : {quotations.length}</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-80 p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                />
            </div>
            <div className="mb-4 flex items-center gap-3">
                <h3 className="font-semibold text-lg">Select Order Status : </h3>
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="orderStatus"
                        value="Confirmed"
                        checked={selectedStatus === "Confirmed"}
                        onChange={handleChange}
                        className="w-6 h-6"
                    />
                    <span className="text-lg">Confirmed Order</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="orderStatus"
                        value="Unconfirmed"
                        checked={selectedStatus === "Unconfirmed"}
                        onChange={handleChange}
                        className="w-6 h-6"
                    />
                    <span className="text-lg">Unconfirmed Quotations</span>
                </label>
            </div>
            {selectedStatus && (
                <table className="w-full bg-white shadow-md rounded-lg border-collapse mt-2 text-center">
                    <thead>
                        <tr className="py-6 bg-blue-500 text-white text-lg">
                            <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Qtn No</th>
                            <th className="border border-gray-300 py-6 px-4w-32 whitespace-nowrap overflow-hidden text-ellipsis">Date</th>
                            <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Staff ID</th>
                            <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Cus Name</th>
                            <th className="border border-gray-300 py-6  px-4 w-32 whitespace-nowrap overflow-hidden text-ellipsis">Address</th>
                            <th className="border border-gray-300 py-6  px-4 whitespace-nowrap overflow-hidden text-ellipsis">Contact No</th>
                            {selectedStatus === "Unconfirmed" && <th className="border border-gray-300 py-6">Confirm</th>}
                            <th className="border border-gray-300 py-6">Edit</th>
                            <th className="border border-gray-300 py-6">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotations.length > 0 ? (
                            quotations.map((quotation, index) => (
                                <tr key={index} className="uppercase text-center hover:bg-gray-100">
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.quotation_no}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.date}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.sales_person}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.cus_name}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.cus_address}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.cus_contact}</td>
                                    {selectedStatus === "Unconfirmed" && (
                                        <td className="px-4 py-2 border border-gray-300">
                                            <button
                                                className="px-3 py-1 w-32 h-10 font-bold text-md bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                                                onClick={() => confirmOrder(quotation)}
                                            >
                                                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                                                Confirm
                                            </button>
                                        </td>
                                    )}
                                    <td className="px-4 py-2 border border-gray-300">
                                        <button
                                            className="px-3 py-1 w-32 h-10 font-bold text-md bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none"
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                            Edit
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <button
                                            className="px-3 py-1 w-32 h-10 font-bold text-md bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={selectedStatus === "Unconfirmed" ? 9 : 8}
                                    className="px-4 py-6 border border-gray-300 text-center"
                                >
                                    No Quotations Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Main