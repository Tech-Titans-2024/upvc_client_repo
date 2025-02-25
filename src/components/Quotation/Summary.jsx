import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';

function Summary(props) 
{
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);

    const handleEditRow = (index) => {
        setEditingData({ ...props.savedData[index] });
        setEditingIndex(index);
        setIsPopupOpen(true);
    }

    const handleSaveEdit = () => {
        const updatedData = [...props.savedData];
        updatedData[editingIndex] = editingData;
        props.setSavedData(updatedData);
        setIsPopupOpen(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingData((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <>
            <table className="table-auto border-collapse border-2 border-black">
                <thead className=''>
                    <tr className="bg-orange-300 h-14">
                        <th className="border-2 border-black px-4 py-2 uppercase font-bold">Brand</th>
                        <th className="border-2 border-black px-4 py-2 uppercase font-bold">Type</th>
                        <th className="border-2 border-black px-4 py-2 uppercase font-bold">Variant</th>
                        <th className="border-2 border-black px-4 py-2 uppercase font-bold">Width</th>
                        <th className="border-2 border-black px-4 py-2 uppercase font-bold">Height</th>
                        <th className="border-2 border-black px-4 py-2 uppercase font-bold">Total</th>
                        <th className="border-2 border-black px-4 py-2 uppercase font-bold" colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.savedData.map((data, index) => (
                        <tr key={index}>
                            {["brand", "type", "variant", "width", "height", "totalcost"].map((field) => (
                                <td key={field} className="border-2 border-black font-bold py-3 text-center">
                                    {data[field] || "N/A"}
                                </td>
                            ))}
                            <td className="border-2 border-black font-bold font-lg w-[12%] p-2">
                                <button
                                    className="bg-blue-500 text-white text-lg w-[100%] py-2.5 rounded-lg"
                                    onClick={() => handleEditRow(index)}
                                >
                                    <FontAwesomeIcon icon={faEdit} className="text-md mr-2" />
                                    Edit
                                </button>
                            </td>
                            <td className="border-2 border-black font-bold w-[12%] p-2">
                                <button
                                    className="bg-red-500 text-white text-lg w-[100%] py-2.5 rounded-lg"
                                    onClick={() => props.handleDeleteRow(index)}
                                >
                                    <FontAwesomeIcon icon={faTrash} className="text-md mr-2" />
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-11/12 max-w-4xl">
                        <div className="flex justify-between items-center border-b pb-4 mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 uppercase tracking-wider">
                                Edit Quotation Details
                            </h2>
                            <button
                                className="text-gray-400 hover:text-red-500 transition duration-200"
                                onClick={() => setIsPopupOpen(false)}
                                aria-label="Close Popup"
                            >
                                <FontAwesomeIcon icon={faTimes} size="lg" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                "Brand", "Product", "Type", "Variant", "Mesh",
                                "Frame", "Lock", "Width", "Height", "Feet",
                                "Area", "Price", "Quantity", "Total Qty Price",
                                "Glass", "Thickness", "Color", "tp Cost", "total Cost",
                            ].map((field) => {
                                const fieldKey = field.toLowerCase().replace(/\s+/g, "");
                                const fieldValue = editingData[fieldKey];
                                const disabledFields = ["brand", "product", "type", "variant", "mesh", "frame", "lock"];
                                return editingData.hasOwnProperty(fieldKey) ? (
                                    <div key={field} className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-700 tracking-wide">
                                            {field.toUpperCase()} :
                                        </label>
                                        <input
                                            type="text"
                                            name={fieldKey}
                                            value={fieldValue || ""}
                                            onChange={handleChange}
                                            disabled={disabledFields.includes(fieldKey)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                                            placeholder={`Enter ${field}`}
                                        />
                                    </div>
                                ) : null;
                            })}
                        </div>
                        <div className="flex justify-end mt-8 space-x-4">
                            <button
                                className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                                onClick={() => setIsPopupOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center space-x-2 transition"
                                onClick={handleSaveEdit}
                            >
                                <FontAwesomeIcon icon={faSave} />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Summary;