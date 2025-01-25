import React, { useState, useEffect } from 'react';
import Product from './Product';
import axios from 'axios'

function Main() 
{
    const apiUrl = import.meta.env.VITE_API_URL;
    const [type, setType] = useState([]);
    const [variant, setVariant] = useState([]);
    const [currentData, setCurrentData] = useState({
        brand: 'Veka', product: 'Door', type: '', variant: '', mesh: 'No', frame: '',
        lock: '', width: '', height: '', feet: '', area: '', price: '', quantity: '',
        totalQtyPrice: '', glass: '', thickness: '', color: '', tpCost: '', totalCost: '', img: ''
    })

    useEffect(() => 
    {
        const fetchType = async () => {
            try 
            {
                let response;
                if (currentData.product === 'Door') {
                    response = await axios.get(`${apiUrl}/api/doorTypes`);
                    setType(response.data);
                }
                else if (currentData.product === 'Window') {
                    response = await axios.get(`${apiUrl}/api/windowTypes`);
                    setType(response.data);
                }
                else if (currentData.product === 'Louver') {
                    response = await axios.get(`${apiUrl}/api/louverVariants`);
                    setVariant(response.data)
                }
            }
            catch (error) { console.error('Error fetching Types :', error); }
        }
        fetchType();

    }, [apiUrl, currentData.product]);

    const handleInputChange = async (name, value) => {

        let lockValue = currentData.lock; 

        if (name === 'type') 
        {
            if (value === 'Sliding Window' || value === 'Sliding Door') { lockValue = 'Toch Lock' } 
            else if (value === 'Open Window' || value === 'Open Door') { lockValue = 'Multipoint Lock'} 
            else { lockValue = 'Normal Lock' }

            try {
                const response = await axios.post(`${apiUrl}/api/variantTypes`, {
                    selected_type: value,
                    selected_category: currentData.product,
                })
                setVariant(response.data);
            } 
            catch (error) {
                console.error('Error fetching Variant Types:', error);
            }
        }
        setCurrentData((prev) => ({ ...prev, [name]: value, lock: lockValue }));
        console.log(currentData);
    }

    return (
        <div className='flex flex-col gap-7 p-3'>
            <span className="text-2xl font-semibold text-white bg-slate-500 py-3 px-5">MEASUREMENTS</span>
            <Product currentData={currentData} handleInputChange={handleInputChange} type={type} variant={variant} />
        </div>
    )
}

export default Main