import React from 'react';
import Logo from '../../assets/logo.jpeg';

function Quotation(props) 
{
    const apiUrl = import.meta.env.VITE_API_URL;

    return (
        <>
            {props.quotation && (
                <div className='p-6 bg-gray-50 border border-gray-300 rounded-md shadow-md'>
                    <div className='mb-6'>
                        <div className='bg-blue-600 text-white font-bold text-lg p-3 rounded-t-md'>To</div>
                        <div className='font-semibold uppercase p-4 bg-white border border-gray-300 rounded-b-md'>
                            <p>{props.customer.cusName}</p>
                            <p>{props.customer.cusAdddress}</p>
                            <p>{props.customer.cusContact}</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
                        <div className='bg-blue-600 text-white font-bold text-lg p-3 rounded-t-md'>Quotation No</div>
                        <div className='bg-blue-600 text-white font-bold text-lg p-3 rounded-t-md'>Salesman Id</div>
                        <div className='bg-blue-600 text-white font-bold text-lg p-3 rounded-t-md'>Date</div>
                        <div className='font-semibold p-4 bg-white border border-gray-300 rounded-b-md'>{props.customer.quotationNo}</div>
                        <div className='font-semibold p-4 bg-white border border-gray-300 rounded-b-md'>{props.customer.salesPerson}</div>
                        <div className='font-semibold p-4 bg-white border border-gray-300 rounded-b-md'>{props.customer.date}</div>
                    </div>
                    {props.savedData.length > 0 && (
                        <div>
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full border border-black shadow-md rounded-md">
                                    <thead className="bg-blue-600 text-white font-bold text-lg">
                                        <tr>
                                            <th className="p-3 border border-black w-[23%]">Product</th>
                                            <th className="p-3 border border-black w-[27%]">Details</th>
                                            <th className="p-3 border border-black w-[15%]">Quantity</th>
                                            <th className="p-3 border border-black w-[15%]">Rate (Rs.)</th>
                                            <th className="p-3 border border-black w-[20%]">Amount (Rs.)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.savedData.map((data, index) => (
                                            <tr key={index} className={`bg-white ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                                                <td className="border border-black">
                                                    <img
                                                        src={`${apiUrl}${data.img}`}
                                                        alt="Product"
                                                        className="w-44 h-32 object-cover mx-auto rounded"
                                                    />
                                                </td>
                                                <td className="p-4 text-left border border-black">
                                                    <div>
                                                        <div className="flex">
                                                            <span className="w-[25%] font-bold">Product</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[70%] ml-1">{data.product}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-[25%] font-bold">Type</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[70%] ml-1">{data.type}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-[25%] font-bold">Variant</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[70%] ml-1">{data.variant}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-[25%] font-bold">Size</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[70%] ml-1">W = {data.width}, H = {data.height}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-[25%] font-bold">Area</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[70%] ml-1">{data.area}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-[25%] font-bold">Glass</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[70%] ml-1">{data.glass}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-[25%] font-bold">Color</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[70%] ml-1">{data.color}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-3 border border-black text-center">{data.quantity}</td>
                                                <td className="p-3 border border-black text-center">{data.price}</td>
                                                <td className="p-3 border border-black text-center">{data.totalPrice}</td>
                                            </tr>
                                        ))}
                                        {/* <tr>
                                            <td colSpan="4" className="p-2 border border-black text-right font-bold">Net Total (Rs.)</td>
                                            <td className="p-2 border border-black text-center font-bold">₹ {data.netTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4" className="p-2 border border-black text-right font-bold">GST (18%)</td>
                                            <td className="p-2 border border-black text-center font-bold">₹ {data.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4" className="p-2 border border-black text-right font-bold">Grand Total (Rs.)</td>
                                            <td className="p-2 border border-black text-center font-bold">₹ {data.gTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        </tr> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {/* <div id="PdfDesign" style={{ display: 'none' }}>
                <div id="printDesignContent">
                    <div className="p-8 w-[794px] h-[1036px] border border-black shadow-lg rounded-lg">
                        <div className="flex justify-between items-center border-b-2 border-blue-900">
                            <div className="flex items-center space-x-4">
                                <img src={Logo} alt="Champion Logo" className="h-40" />
                            </div>
                            <div className="text-right flex flex-col mb-4 space-y-2">
                                <p className="text-sm font-medium text-gray-700 space-x-2">
                                    <span className="font-semibold">
                                        <i className="fas fa-phone-alt mr-2"></i>Phone :
                                    </span>
                                    <span>+91 95008 57165 | +91 90954 78176</span>
                                </p>
                                <p className="text-sm font-medium text-gray-700 space-x-2">
                                    <span className="font-semibold">
                                        <i className="fas fa-envelope mr-2"></i>Email :
                                    </span>
                                    <span>Championupvc1234@gmail.com</span>
                                </p>
                                <p className="text-sm font-medium text-gray-700 space-x-2">
                                    <span className="font-semibold">
                                        <i className="fas fa-map-marker-alt mr-2"></i>Address :
                                    </span>
                                    <span>No : 108, Madurai Road, Manapparai, Trichy - 621 306</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between items-start mt-5">
                            <div>
                                <p className="text-sm font-semibold text-blue-600">TO :</p>
                                <p className="text-sm text-gray-800 mt-2">{props.customer.cus_name || "N/A"}</p>
                                <p className="text-sm text-gray-700">{props.customer.cus_add || "N/A"}</p>
                                <p className="text-sm text-gray-700">{props.customer.cus_con || "N/A"}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-700">
                                    <span className="text-sm font-semibold text-blue-600">DATE : {formattedDate}</span> 
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 pb-10">
                            <p className="text-md leading-relaxed text-gray-800">Dear Sir,</p>
                            <p className="text-md leading-relaxed text-gray-700 mt-4 text-justify ml-4">
                                We are delighted that you are considering our range of windows and doors for your premises. It has gained rapid acceptance across all cities of India for the overwhelming advantages of better protection from noise, heat, rain, dust, and pollution.
                            </p>
                            <p className="text-md leading-relaxed text-gray-700 mt-4 text-justify ml-4">
                                In drawing this proposal, it has been our endeavor to suggest designs that would enhance your comfort and aesthetics from inside and improve the facade of the building.
                            </p>
                            <p className="text-md leading-relaxed text-gray-700 mt-4 text-justify ml-4">
                                We have a well-established service network to deliver seamless service at your doorstep. Our offer comprises the following for your kind proposal.
                            </p>

                            <ul className="list-disc mt-8 text-md">
                                <p>Window Design, Specification, and Value</p>
                                <p>Terms and Conditions</p>
                            </ul>
                        </div>
                        <div className="mt-12 bg-blue-800 text-white p-6 pb-10 rounded-md shadow-lg">
                            <p className="text-center text-sm font-medium">Authorized Signatory</p>
                            <p className="text-center text-sm font-semibold mt-2">Champion UPVC Doors and Windows Manufacturer</p>
                            <p className="text-center text-sm font-medium">No: 108, Madurai Road, Manapparai, Trichy - 621 306.</p>
                        </div>
                    </div>
                    <div className='w-[794px] font-sans text-xs leading-[1.2] mt-1'>
                        <div className='mb-6'>
                            <div className='bg-blue-600 text-white font-bold text-lg rounded-t-md pl-4 pb-4'>To</div>
                            <div className='font-semibold uppercase pl-4 pb-4 bg-white border border-gray-300 rounded-b-md'>
                                <p className='mb-1 mt-2'>{props.customer.cus_name}</p>
                                <p className='mb-1'>{props.customer.cus_add}</p>
                                <p className='mb-1'>{props.customer.cus_con}</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-x-4 mb-6'>
                            <div className='bg-blue-600 text-white font-bold text-lg rounded-t-md pl-4 pb-4'>Quotation No</div>
                            <div className='bg-blue-600 text-white font-bold text-lg rounded-t-md pl-4 pb-4'>Salesman Id</div>
                            <div className='bg-blue-600 text-white font-bold text-lg rounded-t-md pl-4 pb-4'>Date</div>
                            <div className='font-semibold p-2 bg-white border border-gray-300 rounded-b-md pl-4 pb-4'>{props.customer.quotation}</div>
                            <div className='font-semibold p-2 bg-white border border-gray-300 rounded-b-md pl-4 pb-4'>{props.customer.salesper}</div>
                            <div className='font-semibold p-2 bg-white border border-gray-300 rounded-b-md pl-4 pb-4'>{formattedDate}</div>
                        </div>
                        {props.savedData.length > 0 && (
                            <div className='border-none'>
                                <table className="w-full border-collapse table-fixed">
                                    <thead className="bg-blue-600 text-white text-lg border border-black">
                                        <tr>
                                            <th className="w-[23%] pb-5 border-r border-black p-2 text-center align-middle m-0">Product</th>
                                            <th className="w-[27%] pb-5 border-r border-black p-2 text-center align-middle m-0">Details</th>
                                            <th className="w-[15%] pb-5 border-r border-black p-2 text-center align-middle m-0">Quantity</th>
                                            <th className="w-[15%] pb-5 border-r border-black p-2 text-center align-middle m-0">Rate (Rs.)</th>
                                            <th className="w-[20%] pb-5 border-black p-2 text-center align-middle m-0">Amount (Rs.)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.savedData.map((data, index) => (
                                            <tr key={index} className={`bg-white ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                                                <td className="border-b border-l border-r border-black text-center align-middle m-0">
                                                    <img
                                                        src={`${apiUrl}${data.img}`}
                                                        alt="Product"
                                                        className="w-44 h-[150px] object-cover mx-auto rounded p-2"
                                                    />
                                                </td>
                                                <td className="border-b border-r border-black p-2 align-middle m-0">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex justify-start">
                                                            <span className="w-[30%] font-semibold text-gray-700">Product</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[65%] ml-1 text-gray-700">{data.product}</span>
                                                        </div>
                                                        <div className="flex justify-start">
                                                            <span className="w-[30%] font-semibold text-gray-700">Type</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[65%] ml-1 text-gray-700">{data.type}</span>
                                                        </div>
                                                        <div className="flex justify-start">
                                                            <span className="w-[30%] font-semibold text-gray-700">Variant</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[65%] ml-1 text-gray-700">{data.varient}</span>
                                                        </div>
                                                        <div className="flex justify-start">
                                                            <span className="w-[30%] font-semibold text-gray-700">Size</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[65%] ml-1 text-gray-700">W = {data.width}, H = {data.height}</span>
                                                        </div>
                                                        <div className="flex justify-start">
                                                            <span className="w-[30%] font-semibold text-gray-700">Area</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[65%] ml-1 text-gray-700">{data.area}</span>
                                                        </div>
                                                        <div className="flex justify-start">
                                                            <span className="w-[30%] font-semibold text-gray-700">Glass</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[65%] ml-1 text-gray-700">{data.glass}</span>
                                                        </div>
                                                        <div className="flex justify-start pb-3">
                                                            <span className="w-[30%] font-semibold text-gray-700">Color</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[65%] ml-1 text-gray-700">{data.color}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border-b border-r border-black text-center align-middle m-0">
                                                    <span>{data.quantity}</span>
                                                </td>
                                                <td className="border-b border-r border-black text-center align-middle m-0">
                                                    <span>{data.price}</span>
                                                </td>
                                                <td className="border-b border-r border-black text-center align-middle m-0">
                                                    <span>{data.totalPrice}</span>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="4" className="border-l border-r border-black pb-3 pr-2 align-middle m-0 text-right font-bold">
                                                Net Total (Rs.)
                                            </td>
                                            <td className="pb-3 pr-2 border-b border-r border-black text-center font-bold">
                                                ₹ {netTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4" className="border border-black pb-3 pr-2 align-middle m-0 text-right font-bold">
                                                GST (18%)
                                            </td>
                                            <td className="pb-3 pr-2 border-b border-r border-black text-center font-bold">
                                                ₹ {gst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4" className="border-b border-l border-r border-black pb-3 pr-2 align-middle m-0 text-right font-bold">
                                                Grand Total (Rs.)
                                            </td>
                                            <td className="pb-3 pr-2 border-b border-r border-black text-center font-bold">
                                                ₹ {gTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default Quotation;