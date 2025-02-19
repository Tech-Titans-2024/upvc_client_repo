import React, { useEffect, useState } from 'react'
import Edit from './Edit';
import axios from 'axios';


function Main() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [edit, setEdit] = useState(false);
    const [priceData, setPriceData] = useState([]);
    const [editPriceData, setEditPriceData] = useState([]);
    const [changedData, setChangedData] = useState({});
    const [price_id, setPrice_id] = useState()
    const [isDelete, setIsDelete] = useState(false);
    const [DeleteId, setDeleteId] = useState();
    const [filteredData, setFilteredData] = useState([]); // For filtered results
    const [searchTerm, setSearchTerm] = useState(""); // Search term


    useEffect(() => {
        const fetchPriceList = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/pricelistdata`);
                if (response.data) {
                    setPriceData(response.data);
                    setFilteredData(response.data);
                }
            } catch (err) {
                console.log("SOMETHING ERROR", err);
            }
        };



        fetchPriceList();
    }, [edit,isDelete]);

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);
    
        if (searchValue === "") {
            setFilteredData(priceData); // Reset when search is empty
        } else {
            const filtered = priceData.filter((item) =>
                item.product.toLowerCase().includes(searchValue) ||
                (item.type && item.type.toLowerCase().includes(searchValue)) ||
                (item.variant && item.variant.toLowerCase().includes(searchValue)) ||
                item.brand.toLowerCase().includes(searchValue) ||
                String(item.price).includes(searchValue) // Convert price to string and check
            );
            setFilteredData(filtered);
        }
    };
    
    

    const updatePrice = async (newChangedData) => {
    
        try {
            const response = await axios.put(`${apiUrl}/api/updateprice`, {
                changedData: newChangedData,  // Use latest data directly
                price_id
            });
    
            if (response.data) {
                console.log("Updated Data:", response.data);
            }
        } catch (err) {
            console.log("ERROR:", err);
        }
    };
    



    const handledelete = async () => {
        console.log(DeleteId, "Delete Id");

        try {
            const response = await axios.put(`${apiUrl}/api/deleteprice`, { DeleteId })
            if (response.data.message === "success") {
                setIsDelete(false)
                setDeleteId();
            }
            else {
                alert(response.data.message)
            }
        } catch (err) {
            console.log(err);
        }
    }

    // console.log(changedData, "DATAS FROM ");

    return (
        <div className="w-full h-screen">
            <h1 className="text-black text-3xl font-bold text-center">Price List</h1>
            <div className="w-full h-fit flex justify-between items-center gap-5 py-2">
                <h1 className="font-bold text-lg">No of Products: {priceData.length}</h1>
                <div className="flex gap-5">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-80 p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white h-16">
                            <th className="px-4 py-2 border border-gray-300">S No</th>
                            <th className="px-4 py-2 border border-gray-300">Category</th>
                            <th className="px-4 py-2 border border-gray-300">Type</th>
                            <th className="px-4 py-2 border border-gray-300">Brand</th>
                            <th className="px-4 py-2 border border-gray-300">Price</th>
                            <th className="px-4 py-2 border border-gray-300">Sq Ft</th>
                            <th className="px-4 py-2 border border-gray-300">Edit</th>
                            <th className="px-4 py-2 border border-gray-300">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((value, index) => {
                                return <tr className="hover:bg-gray-100 h-16 text-center">
                                    <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                                    <td className="px-4 py-2 border border-gray-300">{value.product}</td>
                                    <td className="px-4 py-2 border border-gray-300">{value.type || value.variant}</td>
                                    <td className="px-4 py-2 border border-gray-300">{value.brand}</td>
                                    <td className="px-4 py-2 border border-gray-300">{value.price}</td>
                                    <td className="px-4 py-2 border border-gray-300">{value.width}X{value.height}</td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <button className="px-3 py-1 w-32 h-10 font-bold text-md bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none"
                                            onClick={() => {
                                                setEdit(true);
                                                setEditPriceData({
                                                    product: value.product,
                                                    type: value.type || value.variant,
                                                    brand: value.brand,
                                                    width: value.width,
                                                    height: value.height,
                                                    price: value.price,
                                                });
                                                setPrice_id(value.price_id)
                                                // updatePrice()

                                            }}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <button className="px-3 py-1 w-32 h-10 font-bold text-md bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                                            onClick={() => { setDeleteId(value.price_id), setIsDelete(true) }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            })
                        ) : <tr>
                            <td colSpan="7" className="px-4 py-2 border border-gray-300 text-center">
                                No products found
                            </td>
                        </tr>}



                    </tbody>
                </table>
                {edit && (
                    <Edit edit={setEdit} data={editPriceData} changedData={setChangedData} updateData={updatePrice} />
                )}
                {isDelete && (
                    <div className='w-95 h-50 flex flex-col justify-center items-center bg-amber-600 text-2xl font-bold text-white m-auto inset-0 absolute'>
                        <span>Are You Sure TO delete</span>
                        <button onClick={handledelete}>OK</button>
                        <button onClick={() => setIsDelete(false)}>Cancel</button>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Main