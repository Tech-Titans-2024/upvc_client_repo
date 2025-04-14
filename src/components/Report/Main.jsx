import React from 'react';
import { useNavigate, useParams } from 'react-router-dom'

function Report() 
{
    const { userName } = useParams();
    const navigate = useNavigate();

    const handlePage = (value) => {
        if(value === '1') { navigate(`/upvc/${userName}/productreport`)}
        if(value === '2') { navigate(`/upvc/${userName}/saleswisereport`)}
        if(value === '3') { navigate(`/upvc/${userName}/periodwisereport`)}
    }

    return (
        <div className='p-10'>
            <h1 className="text-black text-3xl font-bold text-center mb-10">Detailed View</h1>
            <div className='flex gap-10 w-[100%] h-24'>
                <button className='w-[33%] bg-blue-500 hover:bg-blue-600 rounded-xl font-bold text-xl text-white' onClick={() => {handlePage('1')}}>Product Wise</button>
                <button className='w-[33%] bg-blue-500 hover:bg-blue-600 rounded-xl font-bold text-xl text-white' onClick={() => {handlePage('2')}}>Sales Wise</button>
                {/* <button className='w-[33%] bg-blue-500 hover:bg-blue-600 rounded-xl font-bold text-xl text-white' onClick={() => {handlePage('3')}}>Period Wise</button> */}
            </div>
        </div>
    )
}

export default Report