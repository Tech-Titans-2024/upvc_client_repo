import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
const StaffManage = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [salesPersons, setSalesPersons] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        staffId: "",
        staffPassword: "",
        name: "",
        phone: "",
        address: "",
        password: "",
    });

    const [selectedPerson, setSelectedPerson] = useState(null);

    // Fetch Sales Persons
    useEffect(() => {
        const fetchSalesPersons = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/salespersons`);
                if (response.data.Message) {
                    return null;
                } else {
                    setSalesPersons(response.data);
                }
            } catch (err) {
                alert("ERROR");
            }
        };

        fetchSalesPersons();
    }, []);

    // Handle Modal Toggles
    const toggleAddModal = () => {
        // Reset form data to empty fields when adding
        setFormData({
            staffId: "",
            name: "",
            phone: "",
            address: "",
            password: "",
        });
        setIsAddModalOpen(!isAddModalOpen);
    };

    const toggleEditModal = () => {
        setIsEditModalOpen(!isEditModalOpen);
    };

    // Handle Form Input Change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const payload = {
                username: formData.staffId,
                name: formData.name,
                number: formData.phone,
                address: formData.address,
                password: formData.password,
            };

            const response = await axios.post(`${apiUrl}/api/salespersons`, payload);
            setSalesPersons((prev) => [...prev, response.data]);
            alert("Salesperson Saved successfully.");

            toggleAddModal();
        } catch (err) {
            alert(err.response?.data?.error || "Error adding sales person.");
            console.error(err.response?.data || err.message);
        }
    };

    // Edit the Sales Person
    const handleEdit = (person) => {
        setSelectedPerson(person);
        setFormData({
            staffId: person.username,
            staffPassword: person.password,
            name: person.name,
            phone: person.number,
            address: person.address,
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate = async () => {
        try {
            const payload = {
                username: formData.staffId,
                password: formData.staffPassword,
                name: formData.name,
                number: formData.phone,  // Ensure the field name matches the backend model
                address: formData.address
            };

            // Correct API endpoint call
            const response = await axios.put(
                `${apiUrl}/api/salespersons/${selectedPerson._id}`,  // Ensure the ID is passed correctly
                payload
            );

            // Update the salespersons list with the response data
            setSalesPersons((prev) =>
                prev.map((person) =>
                    person._id === selectedPerson._id ? response.data : person
                )
            );
            alert("Salesperson Edited successfully.");


            setIsEditModalOpen(false);
            setSelectedPerson(null);
        } catch (err) {
            alert("Error updating salesperson.");
            console.error(err.response?.data || err.message);
        }
    };

    // Delete the Sales Person
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/api/salespersons/${id}`);
            setSalesPersons((prev) => prev.filter((person) => person._id !== id));
            alert("Salesperson deleted successfully.");
        } catch (err) {
            alert("Error deleting salesperson.");
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <div className="w-full h-screen">
            <h1 className="text-black text-3xl font-bold text-center">Sales Executive</h1>
            <div className="w-full h-fit flex justify-between items-center gap-5 py-2">
                <div className="flex flex-row justify-start">
                    <h1 className="font-bold text-lg">No of Staffs : {salesPersons.length}</h1>
                </div>
                <div className="flex gap-5">
                    <button
                        className="p-2 w-32 h-10 font-bold text-md bg-blue-500 text-white rounded-md hover:bg-orange-600 focus:outline-none"
                        onClick={toggleAddModal}
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white h-16">
                            <th className="px-4 py-2 border border-gray-300">S.No</th>
                            <th className="px-4 py-2 border border-gray-300">Staff ID</th>
                            <th className="px-4 py-2 border border-gray-300">Staff Password</th>
                            <th className="px-4 py-2 border border-gray-300">Staff Name</th>
                            <th className="px-4 py-2 border border-gray-300">Phone No</th>
                            <th className="px-4 py-2 border border-gray-300">Address</th>
                            <th className="px-4 py-2 border border-gray-300">Edit</th>
                            <th className="px-4 py-2 border border-gray-300">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesPersons.map((value, index) => (
                            <tr className="hover:bg-gray-100" key={index}>
                                <td className="px-4 py-2 border border-gray-300 text-center">{index + 1}</td>
                                <td className="px-4 py-2 border border-gray-300 text-center">{value.username}</td>
                                <td className="px-4 py-2 border border-gray-300 text-center">{value.password}</td>
                                <td className="px-4 py-2 border border-gray-300">{value.name}</td>
                                <td className="px-4 py-2 border border-gray-300">{value.number}</td>
                                <td className="px-4 py-2 border border-gray-300">{value.address}</td>

                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <button
                                        className="p-2 w-32 h-10 font-bold text-md bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none"
                                        onClick={() => handleEdit(value)}                                                                           >
                                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                        Edit
                                    </button>
                                </td>
                                <td className="px-4 py-2 border border-gray-300 text-center">
                                    <button
                                        className="p-2 w-32 h-10 font-bold text-md bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                                        onClick={() => handleDelete(value._id)} // Pass the salesperson's ID
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Add Sales Person</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Staff ID</label>
                                <input
                                    type="text"
                                    name="staffId"
                                    value={formData.staffId}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Staff Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Phone No</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={toggleAddModal}
                                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Edit Sales Person</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Staff ID</label>
                                <input
                                    type="text"
                                    name="staffId"
                                    value={formData.staffId}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Staff Password</label>
                                <input
                                    type="text"
                                    name="staffPassword"
                                    value={formData.staffPassword}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Staff Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Phone No</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={handleUpdate}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={toggleEditModal}
                                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffManage;
