import React, { useState } from 'react';
import axios from 'axios';

function Main() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [typeId, setTypeId] = useState('');
    const [isValidTypeId, setIsValidTypeId] = useState(true);

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleTypeIdChange = (e) => {
        setTypeId(e.target.value);
    };

    const checkTypeIdExists = async () => {
        if (!typeId) return;

        try {
            const response = await axios.get(`${apiUrl}/api/check-typeid/${typeId}`);
            if (response.data.exists) {
                setIsValidTypeId(true);
            } else {
                setIsValidTypeId(false);
                alert('Type ID does not exist in the database!');
            }
        } catch (error) {
            console.error('Error checking Type ID:', error);
            setIsValidTypeId(false);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }
        if (!typeId) {
            alert('Please enter a Type ID.');
            return;
        }
        if (!isValidTypeId) {
            alert('Invalid Type ID. Please enter a valid Type ID.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('type_id', typeId);

        try {
            const response = await axios.post(`${apiUrl}/api/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload file.');
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center rounded-md">
            <div className="bg-white p-16 rounded-lg shadow-lg w-full max-w-4xl border border-black">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-12 font-cambria">UPLOAD PRODUCT IMAGE</h1>
                <div className="space-y-12">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                        <div className='w-28 flex justify-between'>
                            <label className="font-medium text-lg text-gray-700">Type ID</label>
                            <span><b>:</b></span>
                        </div>
                        <input
                            type="number"
                            className="w-full sm:w-64 h-12 px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                            value={typeId}
                            onChange={handleTypeIdChange}
                            onBlur={checkTypeIdExists}
                            placeholder="Enter Type ID"
                        />
                    </div>
                    <div className="flex items-center">
                        <div className='w-28 flex justify-between'>
                            <label className="font-medium text-lg text-gray-700">Select File </label>
                            <span><b>:</b></span>
                        </div>
                        <div className="border-2 border-black rounded-lg bg-white h-12 p-2 w-80 ml-4">
                            <input type="file" onChange={handleFileChange} />
                        </div>
                        <button
                            className="bg-blue-700 w-32 h-12 font-bold text-lg text-white py-2.5 px-6 rounded-lg shadow hover:bg-blue-800 transition duration-200 ml-4"
                            onClick={handleUpload}
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
