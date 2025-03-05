import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [cusDetails, setCusDetails] = useState([]);

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

  return (
    <div className="w-full h-screen bg-gray-100 p-6">
      <h1 className="text-black text-3xl font-bold text-center mb-6">Customer Details</h1>

      {/* Search Box */}
      <div className="w-full h-fit flex justify-between items-center gap-5 py-2">
        <h1 className="font-bold text-lg text-gray-700">
          Total Customers: {cusDetails.length}
        </h1>
        <div className="flex gap-5">
          <input
            type="text"
            placeholder="Search ..."
            className="w-80 p-3 border-2 text-md border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg mt-4">
        <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-blue-600 text-white text-lg h-14">
              <th className="px-6 py-3 border border-gray-300 text-left">Customer Name</th>
              <th className="px-6 py-3 border border-gray-300 text-left">Contact</th>
              <th className="px-6 py-3 border border-gray-300 text-left">State</th>
              <th className="px-6 py-3 border border-gray-300 text-left">Price</th>
              <th className="px-6 py-3 border border-gray-300 text-left">Sq. Ft.</th>
              <th className="px-6 py-3 border border-gray-300 text-center">Edit</th>
              <th className="px-6 py-3 border border-gray-300 text-center">Delete</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {cusDetails.map((item, index) => (
              <tr
                key={index}
                className="text-gray-700 text-md h-12 even:bg-gray-100 hover:bg-blue-100 transition duration-200"
              >
                <td className="px-6 py-3 border border-gray-300">{item.cus_name}</td>
                <td className="px-6 py-3 border border-gray-300">{item.cus_contact}</td>
                <td className="px-6 py-3 border border-gray-300">{item.cus_state}</td>
                <td className="px-6 py-3 border border-gray-300 text-green-600 font-bold">
                  ₹{item.cus_price || "-"}
                </td>
                <td className="px-6 py-3 border border-gray-300">{item.cus_sqft || "-"}</td>
                <td className="px-6 py-3 border border-gray-300 text-center">
                  <button  className="w-32 h-10 font-bold text-md bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none">
                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
					Edit
                  </button>
                </td>
                <td className="px-6 py-3 border border-gray-300 text-center">
                  <button className="w-32 h-10 font-bold text-md bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
                   <FontAwesomeIcon icon={faTrash} className="mr-2" />
					Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
