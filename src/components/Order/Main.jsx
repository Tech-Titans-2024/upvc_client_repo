import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Edit from './Edit';

function Main() {
    const [quotations, setQuotations] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('Unconfirmed');
    const [edit, setEdit] = useState(false);
    const [quotationPos, setQuotationPos] = useState();
    const [quataion_no, setQuotation_no] = useState();
    const [productPos, setProductPos] = useState();
    const [isDelete, setIsDelete] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [searchTerm, setSearchTerm] = useState(''); // Added for search functionality
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchQuotationDetails = async () => {
            try {
                const response = await axios.post(`${apiUrl}/api/quotationsDetails`, { selectedStatus });
                setQuotations(response.data);
            }
            catch (error) {console.error(error)}
        }
        fetchQuotationDetails()
    }, [apiUrl, selectedStatus, isDelete, edit])

    const handleChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const confirmOrder = async (order) => {
        try {
            await axios.post(`${apiUrl}/api/orderConfirm`, order);
            alert('Order Confirmed successfully!');
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/deleteQuotation`, {deleteId});
            if (response.status === 200) {
                alert(response.data.message);
                setIsDelete(false);
            } else {
                alert("Quotation Not deleted");
            }
        } catch (err) {
            console.error("Error in delete quotation", err);
            alert("An error occurred while deleting the quotation.");
        }
    };


    // Filter quotations based on search term
    const filteredQuotations = quotations.filter(quotation =>
        quotation.quotation_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quotation.cus_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quotation.cus_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quotation.cus_contact.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full h-full bg-white p-2">
            <h1 className="font-bold text-center text-2xl mb-4">Order Confirmation Details</h1>
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-lg">No of Quotations : {quotations.length}</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-80 p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                    value={searchTerm} // Bind search term
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term
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
                            <th className="border border-gray-300 py-6 px-4 w-32 whitespace-nowrap overflow-hidden text-ellipsis">Date</th>
                            <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Staff ID</th>
                            <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Cus Name</th>
                            <th className="border border-gray-300 py-6 px-4 w-32 whitespace-nowrap overflow-hidden text-ellipsis">Address</th>
                            <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Contact No</th>
                            {selectedStatus === "Unconfirmed" && <th className="border border-gray-300 py-6 px-4">Confirm</th>}
                            {selectedStatus === "Unconfirmed" && <th className="border border-gray-300 py-6 px-4">Edit</th>}
                            {selectedStatus === "Unconfirmed" && <th className="border border-gray-300 py-6 px-4">Delete</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredQuotations.length > 0 ? ( // Use filteredQuotations instead of quotations
                            filteredQuotations.map((quotation, index) => (
                                <tr key={index} className="uppercase text-center hover:bg-gray-100">
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.quotation_no}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.date}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.sales_person}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.cus_name}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.cus_address}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.cus_contact}</td>
                                    {selectedStatus === "Unconfirmed" && (
                                        <>
                                            <td className="px-4 py-2 border border-gray-300">
                                                <button
                                                    className="px-3 py-1 w-32 h-10 font-bold text-md bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                                                    onClick={() => confirmOrder(quotation)}
                                                >
                                                    <FontAwesomeIcon icon={faCheck} className="mr-2" />
                                                    Confirm
                                                </button>
                                            </td>
                                            <td className="px-4 py-2 border border-gray-300">
                                                <button
                                                    className="px-3 py-1 w-32 h-10 font-bold text-md bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none"
                                                    onClick={() => {setEdit(true), setQuotationPos(index)}}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                                    Edit
                                                </button>
                                            </td>
                                            <td className="px-4 py-2 border border-gray-300">
                                                <button
                                                    className="px-3 py-1 w-32 h-10 font-bold text-md bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                                                    onClick={() => {
                                                        setIsDelete(true), setDeleteId(quotation.
                                                            quotation_no)
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                                    Delete
                                                </button>
                                            </td>
                                        </>
                                    )}
                                    
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

            {edit && (
                <Edit isEdit={setEdit} quotations={quotations} quatationNo={quotationPos} Q_no={quataion_no} productPos={productPos} />
            )}

            {isDelete && (
                <div className="fixed inset-0 bg-opacity-50 backdrop-blur flex justify-center items-center z-50">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Deletion</h2>
                        <p className="text-lg text-gray-700 mb-6">Are you sure you want to delete this ?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleDelete}
                                className="px-5 py-2 text-lg bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setIsDelete(false)}
                                className="px-5 py-2 text-lg bg-gray-300 rounded-lg hover:bg-gray-400 shadow-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Main;