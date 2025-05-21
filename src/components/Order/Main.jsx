import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import Edit from './Edit';
import View from './View';

function Main() 
{
    const [quotations, setQuotations] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('Unconfirmed');
    const [edit, setEdit] = useState(false);
    const [quotationPos, setQuotationPos] = useState();
    const [quataion_no, setQuotation_no] = useState();
    const [productPos, setProductPos] = useState();
    const [isDelete, setIsDelete] = useState(false);
    const [deleteId, setDeleteId] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [qtnViewDetails, setQtnViewDetails] = useState(false);
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
    }, [apiUrl, selectedStatus, isDelete, edit])

    const handleChange = (event) => { setSelectedStatus(event.target.value) }

    const confirmOrder = async (order) => {
        try {
            await axios.post(`${apiUrl}/api/orderConfirm`, order);
            alert('Order Confirmed successfully!');
            window.location.reload();
        }
        catch (error) { console.error(error) }
    }

    const handleDelete = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/deleteQuotation`, { deleteId });
            if (response.status === 200) {
                alert(response.data.message);
                setIsDelete(false);
            }
            else { alert("Quotation Not deleted") }
        }
        catch (err) {
            console.error("Error in delete quotation", err);
            alert("An error occurred while deleting the quotation.");
        }
    }
    const filteredQuotations = quotations.filter(quotation =>
        quotation.quotation_no.toString().includes(searchTerm) ||
        quotation.cus_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quotation.cus_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quotation.cus_contact.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const viewQuotation = async (qtnId) => {
        setIsViewModalOpen(true);
        try {
            const response = await axios.post(`${apiUrl}/api/viewQtn`, { qtnId })
            setQtnViewDetails(response.data)
        }
        catch (error) { }
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                <table className="w-full bg-white shadow-md rounded-lg border-collapse mt-2 text-center text-base">
                    <thead>
                        <tr className="bg-blue-500 text-white text-lg h-16">
                            <th className="px-4 py-2 border border-gray-300 whitespace-nowrap">Qtn No</th>
                            <th className="px-4 py-2 border border-gray-300 whitespace-nowrap">Date</th>
                            <th className="px-4 py-2 border border-gray-300 whitespace-nowrap">Staff ID</th>
                            <th className="px-4 py-2 border border-gray-300 whitespace-nowrap">Cus Name</th>
                            <th className="px-4 py-2 border border-gray-300 whitespace-nowrap">Address</th>
                            <th className="px-4 py-2 border border-gray-300 whitespace-nowrap">Contact No</th>
                            {selectedStatus === "Unconfirmed" && <th className="px-4 py-2 border border-gray-300 whitespace-nowrap">Confirm</th>}
                            {selectedStatus === "Unconfirmed" && <th className="px-4 py-2 border border-gray-300 whitespace-nowrap">Edit</th>}
                            {selectedStatus === "Unconfirmed" && <th className="px-4 py-2 border border-gray-300 whitespace-nowrap">Delete</th>}
                            {selectedStatus === "Unconfirmed" && <th className="px-4 py-2 border border-gray-300 whitespace-nowrap">View</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredQuotations.length > 0 ? (
                            filteredQuotations.map((quotation, index) => (
                                <tr key={index} className="hover:bg-gray-100 h-16 text-center text-lg">
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">{quotation.quotation_no}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">{quotation.date}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">{quotation.sales_person}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">{quotation.cus_name}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">{quotation.cus_address}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap">{quotation.cus_contact}</td>
                                    {selectedStatus === "Unconfirmed" && (
                                        <>
                                            <td className="px-2 py-2 w-24 border border-gray-300 whitespace-nowrap">
                                                <button
                                                    className="px-3 py-1.5 font-bold text-md text-white rounded-md focus:outline-none bg-green-500 hover:bg-green-600"
                                                    onClick={() => confirmOrder(quotation)}
                                                >
                                                    <FontAwesomeIcon icon={faCheck} className="" />
                                                    {/* Confirm */}
                                                </button>
                                            </td>
                                            <td className="px-2 py-2 w-24 border border-gray-300 whitespace-nowrap">
                                                <button
                                                    className="px-3 py-1.5 font-bold text-md text-white rounded-md focus:outline-none bg-teal-600 hover:bg-teal-700"
                                                    onClick={() => { setEdit(true); setQuotationPos(index); }}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} className="" />
                                                    {/* Edit */}
                                                </button>
                                            </td>
                                            <td className="px-2 py-2 w-24 border border-gray-300 whitespace-nowrap">
                                                <button
                                                    className="px-3 py-1.5 font-bold text-md text-white rounded-md focus:outline-none bg-red-500 hover:bg-red-600"
                                                    onClick={() => {
                                                        setIsDelete(true); setDeleteId(quotation.quotation_no);
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} className="" />
                                                    {/* Delete */}
                                                </button>
                                            </td>
                                            <td className="px-2 py-2 w-24 border border-gray-300 whitespace-nowrap">
                                                <button
                                                    className="px-3 py-1.5 font-bold text-md text-white rounded-md focus:outline-none bg-orange-400 hover:bg-orange-500"
                                                    onClick={() => viewQuotation(quotation.quotation_no)}
                                                >
                                                    <FontAwesomeIcon icon={faEye} className="" />
                                                    {/* View */}
                                                </button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={selectedStatus === "Unconfirmed" ? 10 : 7}
                                    className="px-2 py-4 border border-gray-300 text-center"
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
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300">
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
            <View
                viewQuotation={viewQuotation}
                isViewModalOpen={isViewModalOpen}
                qtnViewDetails={qtnViewDetails}
                closeModal={() => setIsViewModalOpen(false)}
            />
        </div>
    )
}

export default Main;