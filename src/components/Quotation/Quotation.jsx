import React from 'react';
import Logo from '../../assets/logo.jpeg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

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
                                                <td className="border border-black relative text-center w=[40%] pl-3 ml-2">
                                                    <img
                                                        src={`${apiUrl}${data.image}`}
                                                        alt="Product"
                                                        className="w-44 h-32 object-cover rounded mt-8 mx-auto ml-3"
                                                    />
                                                    <div className="mt-3 flex justify-center items-center font-bold text-sm mb-4 -ml-6">
                                                        <span>&lt;------</span>
                                                        <span className="mx-2"> {data.width} </span>
                                                        <span>------&gt;</span>
                                                    </div>
                                                    <div className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 flex flex-col items-center font-bold text-sm space-y-3.5 -mt-2">
                                                        <span className="inline-block rotate-90 ml-5 mr-5">&lt;------</span>
                                                        <span className="text-center ml-5 mr-5"> {data.height} </span>
                                                        <span className="inline-block rotate-90 ml-5 mr-5">------&gt;</span>
                                                    </div>
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
                                                            <span className="w-[25%] font-bold">Feet</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[70%] ml-1">{data.feet} ft</span>
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
                                                        {data.floor !== "" && (
                                                            <div className="flex">
                                                                <span className="w-[25%] font-bold">Floor</span>
                                                                <span className="w-[5%] text-center">:</span>
                                                                <span className="w-[70%] ml-1">{data.floor}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-3 border border-black text-center">{data.quantity}</td>
                                                <td className="p-3 border border-black text-center">{data.price}</td>
                                                <td className="p-3 border border-black text-center">{data.totalcost}</td>
                                            </tr>
                                        ))}
                                        {props.customer && (
                                            <>
                                                <tr>
                                                    <td colSpan="4" className="p-2 border border-black text-right font-bold">Net Total (Rs.)</td>
                                                    <td className="p-2 border border-black text-center font-bold">₹ {props.customer.netTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                </tr>
                                                {props.customer.cusState === 'Tamil Nadu' && (
                                                    <>
                                                        <tr>
                                                            <td colSpan="4" className="p-2 border border-black text-right font-bold">CGST (9%)</td>
                                                            <td className="p-2 border border-black text-center font-bold">₹ {props.customer.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="4" className="p-2 border border-black text-right font-bold">SGST (9%)</td>
                                                            <td className="p-2 border border-black text-center font-bold">₹ {props.customer.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                        </tr>
                                                    </>
                                                )}
                                                {props.customer.cusState !== 'Tamil Nadu' && (
                                                    <>
                                                        <tr>
                                                            <td colSpan="4" className="p-2 border border-black text-right font-bold">CGST (9%)</td>
                                                            <td className="p-2 border border-black text-center font-bold">₹ {props.customer.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="4" className="p-2 border border-black text-right font-bold">IGST (9%)</td>
                                                            <td className="p-2 border border-black text-center font-bold">₹ {props.customer.igst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                        </tr>
                                                    </>
                                                )}
                                                <tr>
                                                    <td colSpan="4" className="p-2 border border-black text-right font-bold">Transport Cost (Rs.)</td>
                                                    <td className="p-2 border border-black text-center font-bold">₹ {props.customer.tpcost.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="p-2 border border-black text-right font-bold">Grand Total (Rs.)</td>
                                                    <td className="p-2 border border-black text-center font-bold">₹ {props.customer.gTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                </tr>
                                            </>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div id="PdfDesign" style={{ display: 'none' }}>
                <div id="printDesignContent">
                    <div className="p-8 w-[794px] h-[1036px] border border-black shadow-lg rounded-lg space-y-2">
                        <div className="text-center flex justify-center items-center">
                            <img src={Logo} alt="Champion Logo" className="h-40 text-center" />
                        </div>
                        <div className="flex justify-between border-b-2 pb-4 border-blue-900">
                            <div className='flex item-center justify-center gap-2'>
                                <div className='flex justify-center items-center mt-2'>
                                    <FontAwesomeIcon icon={faPhone} className='text-2xl mt-1 pb-2.5' />
                                </div>
                                <div className=''>
                                    <p className='text-sm'>95008 57165</p>
                                    <p className='text-sm'>90954 78176</p>
                                </div>
                            </div>
                            <div className='flex item-center justify-center gap-2'>
                                <div className='flex justify-center items-center mt-3'>
                                    <FontAwesomeIcon icon={faEnvelope} className='text-2xl mt-1 pb-2' />
                                </div>
                                <div className='flex justify-center items-center'>
                                    <span>Championupvc1234@gmail.com</span>
                                </div>
                            </div>
                            <div className='flex item-center justify-center gap-2'>
                                <div className='flex justify-center items-center mt-2'>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className='text-2xl mt-1 pb-2.5' />
                                </div>
                                <div className=''>
                                    <p className='text-sm'>No : 108, Madurai Road, Manapparai,</p>
                                    <p className='text-sm'>Trichy - 621 306</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-start mt-5">
                            <div>
                                <p className="text-sm font-semibold text-blue-600">TO :</p>
                                <p className="text-sm text-gray-800 mt-2">{props.customer.cusName || "N/A"}</p>
                                <p className="text-sm text-gray-700">{props.customer.cusAddress || "N/A"}</p>
                                <p className="text-sm text-gray-700">{props.customer.cusContact || "N/A"}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-700">
                                    <span className="text-sm font-semibold text-blue-600">DATE : {props.customer.date}</span>
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
                    <div className='w-[794px] font-sans text-xs leading-[1.2] mt-1 mb-3'>
                        <div className='mb-6'>
                            <div className='bg-blue-600 text-white font-bold text-lg rounded-t-md pl-4 pb-4'>To</div>
                            <div className='font-semibold uppercase pl-4 pb-4 bg-white border border-gray-300 rounded-b-md'>
                                <p className='mb-1 mt-2'>{props.customer.cusName}</p>
                                <p className='mb-1'>{props.customer.cusAddress}</p>
                                <p className='mb-1'>{props.customer.cusContact}</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-x-4 mb-6'>
                            <div className='bg-blue-600 text-white font-bold text-lg rounded-t-md pl-4 pb-4'>Quotation No</div>
                            <div className='bg-blue-600 text-white font-bold text-lg rounded-t-md pl-4 pb-4'>Salesman Id</div>
                            <div className='bg-blue-600 text-white font-bold text-lg rounded-t-md pl-4 pb-4'>Date</div>
                            <div className='font-semibold p-2 bg-white border border-gray-300 rounded-b-md pl-4 pb-4'>{props.customer.quotationNo}</div>
                            <div className='font-semibold p-2 bg-white border border-gray-300 rounded-b-md pl-4 pb-4'>{props.customer.salesPerson}</div>
                            <div className='font-semibold p-2 bg-white border border-gray-300 rounded-b-md pl-4 pb-4'>{props.customer.date}</div>
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
                                                <td className="border-b border-l border-r border-black text-center align-middle m-0 w=[44%] pl-3 ml-2 relative">
                                                    <img
                                                        src={`${apiUrl}${data.image}`}
                                                        alt="Product"
                                                        className="w-28 h-32 object-cover rounded mt-8 mx-auto ml-3"
                                                    />
                                                    <div className="mt-2 flex justify-center items-center font-bold text-sm mb-4 -ml-6">
                                                        <span>&lt;------</span>
                                                        <span className="mx-2"> {data.width} </span>
                                                        <span>------&gt;</span>
                                                    </div>
                                                    <div className="absolute top-1/2 right-[-25px] transform -translate-y-1/2 flex flex-col items-center font-bold text-sm space-y-3.5 -mt-2">
                                                        <span style={{ display: "inline-block", transform: "rotate(90deg)" }} className="ml-5 mr-5">&lt;------</span>
                                                        <span style={{ display: "inline-block", transform: "rotate(90deg)" }} className="ml-5 mr-5"> {data.height} </span>
                                                        <span style={{ display: "inline-block", transform: "rotate(90deg)" }} className="ml-5 mr-5">------&gt;</span>
                                                    </div>
                                                </td>
                                                <td className="border-b border-r border-black p-2 align-middle m-0">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex justify-start ml-2">
                                                            <span className="w-[30%] font-semibold text-gray-700">Product</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[65%] ml-1 text-gray-700">{data.product}</span>
                                                        </div>
                                                        <div className="flex justify-start ml-2">
                                                            <span className="w-[30%] font-semibold text-gray-700">Type</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[65%] ml-1 text-gray-700">{data.type}</span>
                                                        </div>
                                                        <div className="flex justify-start ml-2">
                                                            <span className="w-[30%] font-semibold text-gray-700">Variant</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[65%] ml-1 text-gray-700">{data.variant}</span>
                                                        </div>
                                                        <div className="flex justify-start ml-2">
                                                            <span className="w-[30%] font-semibold text-gray-700">Size</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[65%] ml-1 text-gray-700">W = {data.width}, H = {data.height}</span>
                                                        </div>
                                                        <div className="flex justify-start ml-2">
                                                            <span className="w-[30%] font-semibold text-gray-700">Feet</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[65%] ml-1 text-gray-700">{data.area} ft</span>
                                                        </div>
                                                        <div className="flex justify-start ml-2">
                                                            <span className="w-[30%] font-semibold text-gray-700">Glass</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[65%] ml-1 text-gray-700">{data.glass}</span>
                                                        </div>
                                                        <div className="flex justify-start ml-2">
                                                            <span className="w-[30%] font-semibold text-gray-700">Color</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[65%] ml-1 text-gray-700">{data.color}</span>
                                                        </div>
                                                        {data.floor != "" && (
                                                            <div className="flex justify-start ml-2 pb-3">
                                                                <span className="w-[30%] font-semibold text-gray-700">Floor</span>
                                                                <span className="w-[5%] text-center">:</span>
                                                                <span className="w-[65%] ml-1 text-gray-700">{data.floor}</span>
                                                            </div>
                                                        )}
                                                    </div> 
                                                </td>
                                                <td className="border-b border-r border-black text-center align-middle m-0">
                                                    <span>{data.quantity}</span>
                                                </td>
                                                <td className="border-b border-r border-black text-center align-middle m-0">
                                                    <span>{data.price}</span>
                                                </td>
                                                <td className="border-b border-r border-black text-center align-middle m-0">
                                                    <span>{data.totalcost}</span>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="4" className="border-l border-r border-black pb-3 pr-2 align-middle m-0 text-right font-bold">
                                                Net Total (Rs.)
                                            </td>
                                            <td className="pb-3 pr-2 border-r border-black text-center font-bold">
                                                ₹ {props.customer.netTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                        </tr>
                                        {props.customer.cusState === 'Tamil Nadu' && (
                                            <>
                                                <tr>
                                                    <td colSpan="4" className="border border-b-0 border-black pb-3 pr-2 align-middle m-0 text-right font-bold border-l border-r">
                                                        CGST (9%)
                                                    </td>
                                                    <td className="pb-3 pr-2 border-b border-r border-t border-black text-center font-bold">
                                                        ₹ {props.customer.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="border border-r border-black pb-3 pr-2 align-middle m-0 text-right font-bold">
                                                        SGST (9%)
                                                    </td>
                                                    <td className="pb-3 pr-2 border-b border-r border-black text-center font-bold">
                                                        ₹ {props.customer.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                        {props.customer.cusState !== 'Tamil Nadu' && (
                                            <>
                                                <tr>
                                                    <td colSpan="4" className="border border-r border-black pb-3 pr-2 align-middle m-0 text-right font-bold">
                                                        CGST (9%)
                                                    </td>
                                                    <td className="pb-3 pr-2 border-b border-r border-t border-black text-center font-bold">
                                                        ₹ {props.customer.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="4" className="border border-t-0 border-black pb-3 pr-2 align-middle m-0 text-right font-bold border-r border-l">
                                                        IGST (9%)
                                                    </td>
                                                    <td className="pb-3 pr-2 border-b border-r border-black text-center font-bold">
                                                        ₹ {props.customer.igst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </td>
                                                </tr>
                                            </>
                                        )}
                                        <tr>
                                            <td colSpan="4" className="border border-t-0 border-black pb-3 pr-2 align-middle m-0 text-right font-bold">
                                                Transport Cost (Rs.)
                                            </td>
                                            <td className="pb-3 pr-2 border-b border-r border-black text-center font-bold">
                                                ₹ {props.customer.tpcost.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4" className="border-b border-l border-r border-black pb-3 pr-2 align-middle m-0 text-right font-bold">
                                                Grand Total (Rs.)
                                            </td>
                                            <td className="pb-3 pr-2 border-b border-r border-black text-center font-bold">
                                                ₹ {props.customer.gTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className="pt-1 w-[794px] h-[1036px] space-y-2 [page-break-before:always] avoid-page-break fix-border avoid-split" style={{ pageBreakBefore: "always" }}>
                        <div className='border border-black shadow-lg rounded-lg px-5 py-3'>
                            <div className='flex'>
                                <div className='w-[70%]'>
                                    <h2 className="text-lg font-semibold mb-2 uppercase">Terms & Conditions :</h2>
                                    <ul className="pl-2 text-sm text-gray-700 space-y-1 mt-4">
                                        <li><span className='mr-2'>1.</span><span>Transportation Charges Included</span></li>
                                        <li><span className='mr-2'>2.</span><span>Kindly fix the grill after installation of UPVC windows</span></li>
                                        <li><span className='mr-2'>3.</span><span>Necessary scaffolding with platform (if required) & power supply has to be supplied by the client</span></li>
                                        <li><span className='mr-2'>4.</span><span>Any chipping or alteration has to be done by the client.</span></li>
                                        <li><span className='mr-2'>5.</span><span>Profile Sticker will be removed at the time of installation else client scope</span></li>
                                        <li><span className='mr-2'>6.</span><span>Power and scaffolding to be provided by client if necessary.</span></li>
                                        <li><span className='mr-2'>7.</span><span>Fly - Screen mesh and glasses are not covered under warranty</span></li>
                                        <li><span className='mr-2'>8.</span><span>All disputes subject to Trichy Jurisdictions</span></li>
                                        <li><span className='mr-2'>9.</span><span>Quotation will be valid for a period of 15 days</span></li>
                                    </ul>
                                </div>
                                <div className="text-center flex justify-center w-[30%]">
                                    <img src={Logo} alt="Champion Logo" className="h-40 text-center" />
                                </div>
                            </div>
                            <h2 className="text-lg font-semibold mb-2 mt-4 uppercase">Material Description :</h2>
                            <div className="flex justify-evenly">
                                <div className='flex flex-col justify-center items-center mt-3'>
                                    <h3 className="font-semibold">Profile :</h3>
                                    <img src={Logo} alt="VEKA" className="h-20 my-2" />
                                    <p className="text-gray-600">With 20 Years of Warranty</p>
                                </div>
                                <div className='flex flex-col justify-center items-center mt-3'>
                                    <h3 className="font-semibold">Reinforcement Steel:</h3>
                                    <img src={Logo} alt="AM/NS India" className="h-20 my-2" />
                                    <p style={{ display: 'none' }}>Champion</p>
                                </div>
                            </div>
                            <div className='flex flex-col justify-center items-center mt-4'>
                                <h3 className="font-semibold">Accessories:</h3>
                                <div className="flex space-x-4 my-2">
                                    <img src={Logo} alt="OBEN" className="h-20" />
                                    <img src={Logo} alt="KM" className="h-20" />
                                </div>
                                <p className="text-gray-600">With 10 Years of Warranty</p>
                            </div>
                            <h2 className="text-lg font-semibold mb-2 mt-4 uppercase">Payment Terms :</h2>
                            <p className="text-gray-700 text-sm ml-3">
                                All Payments for the Quotation cum Work are to be made in advance. All payments should be made payable by A/c payee Cheque/DD to the account of <b>"CHAMPION UPVC WINDOWS AND DOORS"</b>.
                            </p>
                            <h2 className="text-lg font-semibold mb-2 mt-4 uppercase">Bank Details :</h2>
                            <ul className="text-gray-700 text-sm ml-3">
                                <p><span className='inline-block w-36 font-bold'>Account Name</span>: <span className='ml-2'>CHAMPION UPVC WINDOWS & DOORS</span></p>
                                <p><span className='inline-block w-36 font-bold'>Account Number</span>: <span className='ml-2'>5020078986640</span></p>
                                <p><span className='inline-block w-36 font-bold'>Bank Name</span>: <span className='ml-2'>HDFC Bank</span></p>
                                <p><span className='inline-block w-36 font-bold'>IFSC</span>: <span className='ml-2'>HDFC0005880</span></p>
                                <p><span className='inline-block w-36 font-bold'>Branch</span>: <span className='ml-2'>HDFC0005880</span></p>
                            </ul>
                            <div className="mt-7 bg-blue-800 text-white p-1 pb-6 pl-2 rounded-md shadow-lg mb-5">
                                <p className="text-white font-semibold text-sm">
                                    I hereby accept the estimate as per the above-mentioned price & specifications. I have read & understood the terms & conditions & agree to them.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Quotation;