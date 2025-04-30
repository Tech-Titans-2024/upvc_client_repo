import React from 'react'

function Customer(props) {
    console.log(props.customer.quotationNo)
    return (
        <div className='p-5 grid grid-cols-4 gap-7 border-2 border-black rounded-lg py-12 '>
            <div className='flex flex-col gap-4'>
                <label className='font-semibold ml-1 uppercase'>Customer Name :</label>
                <input
                    type="text"
                    placeholder=''
                    className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name='cusName'
                    value={props.customer.cusName}
                    onChange={props.handleCustomer}
                    autoComplete='off'
                />
            </div>
            <div className='flex flex-col gap-4'>
                <label className='font-semibold ml-1 uppercase'>Customer Address :</label>
                <input
                    type="text"
                    placeholder=''
                    className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name='cusAddress'
                    value={props.customer.cusAddress}
                    onChange={props.handleCustomer}
                    autoComplete='off'
                />
            </div>
            <div className='flex flex-col gap-4'>
                <label className='font-semibold ml-1 uppercase'>State :</label>
                <select
                    className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name='cusState'
                    value={props.customer.cusState}
                    onChange={props.handleCustomer}
                    autoComplete='off'
                >
                    <option className='p-2 text-md'>Select</option>
                    <option className='p-2 text-md'>Tamil Nadu</option>
                    <option className='p-2 text-md'>Others</option>
                </select>
            </div>
            <div className='flex flex-col gap-4'>
                <label className='font-semibold ml-1 uppercase'>Customer Phone No :</label>
                <input
                    type="text"
                    placeholder=''
                    className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name='cusContact'
                    value={props.customer.cusContact}
                    onChange={props.handleCustomer}
                    autoComplete='off'
                />
            </div>
            <div className='flex flex-col gap-4'>
                <label className='font-semibold ml-1 uppercase '>Sales Person Id :</label>
                <select name='salesPerson' className='w-full p-3 border-2 border-black rounded-md ' onChange={props.handleCustomer}>
                    <option >Select..</option>
                    {props.salesPersons.map((value, index) => {
                        return <option key={index} value={value.username} >{value.username}</option>
                    })}
                </select>
            </div>
            <div className='flex flex-col gap-4'>
                <label className='font-semibold ml-1 uppercase'>Quotation Id :</label>
                <input
                    type="text"
                    placeholder=''
                    className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name='quotationNo'
                    value={props.customer.quotationNo}
                    disabled
                    onChange={props.handleCustomer}
                />
            </div>
            <div className='flex flex-col gap-4'>
                <label className='font-semibold ml-1 uppercase'>Transport Cost :</label>
                <input
                    type="text"
                    placeholder=''
                    className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name='tpcost'
                    value={props.customer.tpcost}
                    onChange={props.handleCustomer}
                />
            </div>
        </div>
    )
}

export default Customer;