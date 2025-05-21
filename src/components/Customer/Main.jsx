import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Main = () => 
{
	const apiUrl = import.meta.env.VITE_API_URL;
	const [cusDetails, setCusDetails] = useState([]);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [formData, setFormData] = useState({ cus_name: "", cus_contact: "", cus_address: "" });
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchCustomer = async () => {
			try {
				const response = await axios.get(`${apiUrl}/api/CustomerDetails`);
				setCusDetails(response.data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchCustomer();
	}, [apiUrl]);

	const toggleEditModal = () => setIsEditModalOpen(!isEditModalOpen);
	const toggleDeleteModal = () => setIsDeleteModalOpen(!isDeleteModalOpen);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleEdit = (customer) => {
		setSelectedCustomer(customer);
		setFormData({
			cus_name: customer.cus_name,
			cus_contact: customer.cus_contact,
			cus_address: customer.cus_address,
		});
		toggleEditModal();
	};

	const handleUpdate = async () => {
		try {
			const response = await axios.put(`${apiUrl}/api/CustomerDetails/${selectedCustomer._id}`, formData);
			setCusDetails((prev) =>
				prev.map((customer) =>
					customer._id === selectedCustomer._id ? response.data : customer
				)
			);
			alert("Customer updated successfully.");
			toggleEditModal();
		}
		catch (err) {
			alert("Error updating customer.");
			console.error(err);
		}
	};

	const handleDelete = async () => {
		try {
			await axios.delete(`${apiUrl}/api/CustomerDetails/${selectedCustomer._id}`);
			setCusDetails((prev) => prev.filter((customer) => customer._id !== selectedCustomer._id));
			alert("Customer deleted successfully.");
			toggleDeleteModal();
		}
		catch (err) {
			alert("Error deleting customer.");
			console.error(err);
		}
	};

	const filteredCustomers = cusDetails.filter((customer) =>
		customer.cus_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		customer.cus_contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
		customer.cus_address.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="w-full h-screen">
			<h1 className="text-black text-3xl font-bold text-center mb-6">Customer Details</h1>
			<div className="w-full h-fit flex justify-between items-center gap-5 py-2">
				<h1 className="font-bold text-lg text-gray-700">
					Total Customers: {cusDetails.length}
				</h1>
				<div className="flex gap-5">
					<input
						type="text"
						placeholder="Search ..."
						className="w-80 p-3 border-2 text-md border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>
			<div className="overflow-x-auto rounded-lg">
				<table className="w-full bg-white border border-gray-300 rounded-lg border-collapse">
					<thead>
						<tr className="bg-blue-500 text-white text-lg h-16">
							<th className="px-4 py-2 border border-gray-300">Customer Name</th>
							<th className="px-4 py-2 border border-gray-300">Contact</th>
							<th className="px-4 py-2 border border-gray-300">Address</th>
							<th className="px-4 py-2 border border-gray-300">Edit</th>
							<th className="px-4 py-2 border border-gray-300">Delete</th>
						</tr>
					</thead>
					<tbody>
						{filteredCustomers.map((item, index) => (
							<tr
								key={index}
								className="hover:bg-gray-100 h-16 text-center text-lg"
							>
								<td className="px-4 py-2 border border-gray-300">{item.cus_name}</td>
								<td className="px-4 py-2 border border-gray-300">{item.cus_contact}</td>
								<td className="px-4 py-2 border border-gray-300">{item.cus_address}</td>
								<td className="px-4 py-2 border border-gray-300">
									<button
										onClick={() => handleEdit(item)}
										className="w-32 h-10 font-bold text-md bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none"
									>
										<FontAwesomeIcon icon={faEdit} className="mr-2" />
										Edit
									</button>
								</td>
								<td className="px-6 py-3 border border-gray-300 text-center">
									<button
										onClick={() => { setSelectedCustomer(item); toggleDeleteModal(); }}
										className="w-32 h-10 font-bold text-md bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
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
			{/* Edit Modal */}
			{isEditModalOpen && (
				<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300">
					<div className="bg-white w-[550px] p-6 rounded-lg shadow-lg">
						<h2 className="text-xl font-bold mb-6 text-center">EDIT CUSTOMER</h2>
						<form>
							<div className="mb-4">
								<label className="block font-medium mb-2 text-lg">Customer Name :</label>
								<input
									type="text"
									name="cus_name"
									value={formData.cus_name}
									onChange={handleInputChange}
									className="w-full p-3 border rounded-lg focus:outline-none text-lg"
								/>
							</div>
							<div className="mb-4">
								<label className="block font-medium mb-2 text-lg">Contact :</label>
								<input
									type="text"
									name="cus_contact"
									value={formData.cus_contact}
									onChange={handleInputChange}
									className="w-full p-3 border rounded-lg focus:outline-none text-lg"
								/>
							</div>
							<div className="mb-4">
								<label className="block font-medium mb-2 text-lg">Address :</label>
								<input
									type="text"
									name="cus_address"
									value={formData.cus_address}
									onChange={handleInputChange}
									className="w-full p-3 border rounded-lg focus:outline-none text-lg"
								/>
							</div>
							<div className="flex justify-end gap-4">
								<button
									type="button"
									onClick={handleUpdate}
									className="px-5 py-2 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600"
								>
									Update
								</button>
								<button
									type="button"
									onClick={toggleEditModal}
									className="px-5 py-2 text-lg bg-gray-300 rounded-lg hover:bg-gray-400"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
			{/* Delete Modal */}
			{isDeleteModalOpen && (
				<div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300">
					<div className="bg-white w-96 p-6 rounded-lg shadow-lg text-center">
						<h2 className="text-xl font-bold mb-4 text-red-600">Confirm Deletion</h2>
						<p className="text-lg text-gray-700 mb-6">Are you sure you want to delete this customer?</p>
						<div className="flex justify-center gap-4">
							<button
								onClick={handleDelete}
								className="px-5 py-2 text-lg bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md"
							>
								Delete
							</button>
							<button
								onClick={toggleDeleteModal}
								className="px-5 py-2 text-lg bg-gray-300 rounded-lg hover:bg-gray-400 shadow-md"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Main;