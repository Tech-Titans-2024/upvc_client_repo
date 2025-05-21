import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Edit(props) 
{
    const [edit, setEdit] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL;
    const [position, setPosition] = useState()
    const [formData, setFormData] = useState({
        feet: "",
    });
    const [totalcost, setTotalCost] = useState();
    const [productCost, setProductCost] = useState();
    const [quotationNo, setQuoatationNo] = useState()
    const [unit, setUnit] = useState("feet");
    const [customerState, setCustomerState] = useState('Tamil Nadu');
    const [isDelete, setIsDelete] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [deleteQuotationNo, setDeleteQuotationNo] = useState(null);

    useEffect(() => {
        if (props.quotations[props.quatationNo].product[position]) {
            setFormData(props.quotations[props.quatationNo].product[position]);
        }
        setTotalCost(props.quotations[props.quatationNo].netTotal)
        setQuoatationNo(props.quotations[props.quatationNo].quotation_no)
        if (props.quotations[props.quatationNo].customer) {
            setCustomerState(props.quotations[props.quatationNo].customer.cusState || 'Tamil Nadu');
        }
    }, [props.quotations, props.quotationNo, position]);

    const calculateGST = (totalcost) => {
        const cgst = totalcost * 0.09;
        let sgst = 0;
        let igst = 0;
        if (customerState === 'Tamil Nadu') { sgst = totalcost * 0.09 }
        else { igst = totalcost * 0.09 }
        const gTotal = totalcost + cgst + sgst + igst;
        return {
            cgst: cgst.toFixed(2),
            sgst: sgst.toFixed(2),
            igst: igst.toFixed(2),
            gTotal: gTotal.toFixed(2)
        };
    };


    const handleChange = async (e) => {

        const { name, value, type } = e.target;

        if (type === "radio") { setUnit(value); return }

        setFormData((prevData) => {
            const updatedData = {
                ...prevData,
                [name]: value,
            }

            const updatedWidth = parseFloat(updatedData.width) || 0;
            const updatedHeight = parseFloat(updatedData.height) || 0;
            const price = parseFloat(updatedData.price) || 0;
            const quantity = parseFloat(updatedData.quantity) || 1;
            const addCost = parseFloat(updatedData.adcost) || 0;

            let updatedArea, areaInFeet, areaInMM;

            if (unit === 'mm') {
                areaInMM = updatedWidth * updatedHeight;
                areaInFeet = areaInMM / (304.8 * 304.8);
                updatedArea = areaInMM.toFixed(2);
            }
            else if (unit === 'feet') {
                areaInFeet = updatedWidth * updatedHeight;
                areaInMM = areaInFeet * (304.8 * 304.8);
                updatedArea = areaInFeet.toFixed(2);
            }

            const totalQtyPrice = (quantity * price * areaInFeet).toFixed(2);
            const totalCost = (parseFloat(totalQtyPrice) + addCost).toFixed(2);
            const gstCalculations = calculateGST(parseFloat(totalCost));

            return {
                ...updatedData, area: updatedArea, feet: areaInFeet.toFixed(2),
                totalqtyprice: totalQtyPrice, totalcost: totalCost, ...gstCalculations
            }
        })

        const priceData = async () => {
            const response = await axios.post(`${apiUrl}/api/pricelist`, {
                height: parseFloat(value) || parseFloat(formData.height),
                width: parseFloat(value) || parseFloat(formData.width),
                selectedProduct: formData.product,
                selectedType: formData.type,
                selectedVariant: formData.variant,
                brand: formData.brand,
            })

            if (response.data?.data !== undefined) {
                const fetchedPrice = parseFloat(response.data.data).toFixed(2);
                setFormData((prev) => ({ ...prev, price: fetchedPrice, }));
            }
        }

        if (name === "height" || name === "width") { priceData() }
    };

    const handleSave = async () => {
        const updatedFormData = {
            ...formData,
            quantity: Number(formData.quantity),
            totalqtyprice: Number(formData.totalqtyprice),
            totalcost: Number(formData.totalcost),
            area: Number(formData.area),
            feet: Number(formData.feet),
            cgst: Number(formData.cgst || 0),
            sgst: Number(formData.sgst || 0),
            igst: Number(formData.igst || 0),
            gTotal: Number(formData.gTotal || formData.totalcost)
        }
        try {
            const response = await axios.post(`${apiUrl}/api/editsaveqtn`, {
                formData: updatedFormData, quotationNo, position
            })

            if (response.status === 200) {
                alert(response.data.message);
                await setTotalCost(response.data.calculatedTotal);
            }
            else { alert("Error occurred while updating.") }
        }
        catch (error) {
            console.error("Error:", error);
            alert("Failed to update product.");
        }
        setEdit(false)
    }

    const handleConfirmDelete = async () => {

        try {
            const response = await axios.post(`${apiUrl}/api/deleteProduct`, {
                index: deleteIndex,
                quotation_no: deleteQuotationNo,
            })

            const updatedQuotations = [...props.quotations];
            const targetQuotation = updatedQuotations.find(q => q.quotation_no === deleteQuotationNo);

            if (targetQuotation) {
                targetQuotation.product.splice(deleteIndex, 1);
                if (targetQuotation.product.length === 0) { alert("All products are deleted.") }
            }
            if (props.setQuotations) { props.setQuotations(updatedQuotations) }
            setIsDelete(false);
        }
        catch (err) { console.error("Delete failed", err) }
    }

    return (
        <>
            <>
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl w-11/12 max-w-6xl">
                        <div className="max-h-[500px] overflow-y-auto">
                            <div className="flex justify-end mb-4">
                                <label
                                    type="button"
                                    onClick={() => props.isEdit(false)}
                                    className="bg-red-500 text-white font-bold text-lg w-9 h-9 flex items-center justify-center rounded-full shadow-md hover:bg-red-600"
                                    title="Close"
                                    aria-label="Close"
                                >
                                    X
                                </label>
                            </div>
                            <table className="table-auto w-full border-collapse border-2 border-black">
                                <thead>
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
                                    {props.quotations[props.quatationNo].product.length > 0 ? (
                                        props.quotations[props.quatationNo].product.map((value, index) => (
                                            <tr key={index}>
                                                <td className="border-2 border-black font-bold py-3 text-center">{value.brand}</td>
                                                <td className="border-2 border-black font-bold py-3 text-center">{value.type}</td>
                                                <td className="border-2 border-black font-bold py-3 text-center">{value.variant}</td>
                                                <td className="border-2 border-black font-bold py-3 text-center">{value.width}</td>
                                                <td className="border-2 border-black font-bold py-3 text-center">{value.height}</td>
                                                <td className="border-2 border-black font-bold py-3 text-center">
                                                    {value.gTotal || value.totalcost}
                                                </td>
                                                <td className="border-2 border-black font-bold w-[12%] p-2">
                                                    <button
                                                        className="w-32 h-10 font-bold text-lg text-white rounded-md focus:outline-none bg-blue-500 hover:bg-blue-600"
                                                        onClick={() => { setEdit(true); setPosition(index) }}
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} className="mr-1" />
                                                        Edit
                                                    </button>
                                                </td>
                                                <td className="border-2 border-black font-bold w-[12%] p-2">
                                                    <button
                                                        className="w-32 h-10 font-bold text-lg text-white rounded-md focus:outline-none bg-red-500 hover:bg-red-600"
                                                        onClick={() => {
                                                            setDeleteIndex(index);
                                                            setDeleteQuotationNo(quotationNo);
                                                            setIsDelete(true);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center py-6 text-gray-600 font-medium">
                                                No products available.
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>

            {edit && (
                <div className='fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-transparent bg-opacity-30 backdrop-blur-md'>
                    <div className='flex flex-col border-2 border-black rounded-lg bg-white bg-opacity-80 p-5 relative'>
                        <label
                            className='absolute top-3 right-3 bg-red-500 text-white font-bold text-lg cursor-pointer hover:bg-red-600 transition duration-200 px-3 py-1 mt-2 mr-2 rounded-full shadow-md'
                            onClick={() => setEdit(false)}
                            title="Close"
                        >
                            X
                        </label>
                        <div className="grid grid-cols-5 gap-7 p-5 mt-4">
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Brand : </label>
                                <input type="text" className='w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    value={formData.brand || ""}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Product : </label>
                                <input type="text" className='w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    value={formData.product || ""}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Type : </label>

                                <input type="text" className='w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    value={formData.type || ""}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Variant : </label>
                                <input type="text" className='w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    value={formData.variant || ""}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Mesh : </label>
                                <input type="text" className='w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    value={formData.mesh || ""}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Frame Series : </label>
                                <input
                                    type="text"
                                    className='w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    value={formData.frame || ""}
                                    name='frame'
                                    disabled={!formData.frame?.trim()}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Lock Type : </label>
                                <input type="text" className='w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    value={formData.lock || ""}
                                    name='lock'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Glass : </label>
                                <select className="w-full p-3 bg-white border-2 border-black rounded-md"
                                    value={formData.glass || ""}
                                    name='glass'
                                    onChange={handleChange}
                                >
                                    <option className='p-2 text-md'>Select</option>
                                    <option className='p-2 text-md'>Normal Glass</option>
                                    <option className='p-2 text-md'>Toughened Glass</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Glass Thickness : </label>
                                <input type="text" className='w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    value={formData.thickness || ""}
                                    name='thickness'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Colour : </label>
                                <select className="w-full p-3 bg-white border-2 border-black rounded-md"
                                    value={formData.color || ""}
                                    name='color'
                                    onChange={handleChange}
                                >
                                    <option className='p-2 text-md'>Select</option>
                                    <option className='p-2 text-md'>Mahogany</option>
                                    <option className='p-2 text-md'>White</option>
                                    <option className='p-2 text-md'>Rustic Oak</option>
                                    <option className='p-2 text-md'>Golden Oak</option>
                                    <option className='p-2 text-md'>Black</option>
                                    <option className='p-2 text-md'>Anthracite Grey</option>
                                    <option className='p-2 text-md'>Walnut</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-7 p-5">
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Unit :</label>
                                <div className="flex h-full items-center justify-center">
                                    <label className="flex items-center justify-center text-lg gap-2 w-full">
                                        <input
                                            type="radio"
                                            name="unit"
                                            value="feet"
                                            checked={unit === "feet"}
                                            onChange={handleChange}
                                            className="w-5 h-5"
                                        />
                                        <span>Feet</span>
                                    </label>
                                    <label className="flex items-center justify-center text-lg gap-2 w-full">
                                        <input
                                            type="radio"
                                            name="unit"
                                            value="mm"
                                            checked={unit === "mm"}
                                            onChange={handleChange}
                                            className="w-5 h-5"
                                        />
                                        <span>Mm</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Width : </label>
                                <input type="number" className='w-32 p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    value={formData.width || ""}
                                    name='width'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Height : </label>
                                <input type="number" className='w-32 p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    value={formData.height || ""}
                                    name='height'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">
                                    {unit === "feet" ? "Sq Ft" : "Sq M"} :
                                </label>
                                <input
                                    type="text"
                                    className="w-32 p-3 bg-gray-200 border-2 border-black rounded-md focus:outline-none"
                                    value={formData.feet}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Area : </label>
                                <input
                                    type="text"
                                    className="w-32 p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    value={(formData.area !== undefined && formData.area !== null) ? Number(formData.area).toFixed(2) : ""}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Price :</label>
                                <input type="text" className='w-32 p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    value={formData.price || ""}
                                    name='price'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Quantity :</label>
                                <input type="number" className='w-32 p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    value={formData.quantity || ""}
                                    name='quantity'
                                    onChange={handleChange}
                                    onWheel={(e) => e.target.blur()}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Total Price :</label>
                                <input type="text" className='w-32 p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    value={formData.totalqtyprice || ""}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Floor : </label>
                                <input type="text" className='w-32 p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    value={formData.floor || ""}
                                    name='floor'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Addl Cost : </label>
                                <input type="text" className='w-32 p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                    value={formData.adcost || ""}
                                    name='adcost'
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">CGST(9%) :</label>
                                <input type="text" className='w-32 p-3 bg-gray-200 border-2 border-black rounded-md'
                                    value={formData.cgst || "0.00"}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">
                                    {customerState === 'Tamil Nadu' ? 'SGST (9%) :' : 'IGST (9%) :'}
                                </label>
                                <input type="text" className='w-32 p-3 bg-gray-200 border-2 border-black rounded-md'
                                    value={customerState === 'Tamil Nadu' ? (formData.sgst || "0.00") : (formData.igst || "0.00")}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase ">Grand Total : </label>
                                <input type="text" className='w-32 p-3 bg-gray-200 border-2 border-black rounded-md focus:outline-none'
                                    value={formData.gTotal || formData.totalcost || ""}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase text-transparent">Save :</label>
                                <button
                                    onClick={handleSave}
                                    className="className='w-32 h-[50px] border-2 border-black font-bold text-white text-lg rounded-md focus:outline-none' bg-blue-500 "
                                >
                                    <FontAwesomeIcon icon={faSave} className="mr-2 text-md" />
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isDelete && (
                <div className='fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-transparent bg-opacity-30 backdrop-blur-md'>
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold mb-4 text-red-600">Confirm Deletion</h2>
                        <p className="text-lg text-gray-700 mb-6">Are you sure you want to delete this?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handleConfirmDelete}
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
        </>
    )
}

export default Edit