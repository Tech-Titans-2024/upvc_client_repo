import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Product from './Product';
import Summary from './Summary';
import Customer from './Customer';
import Quotation from './Quotation';
import html2pdf from 'html2pdf.js';

function Main() 
{
    const apiUrl = import.meta.env.VITE_API_URL;
    const [type, setType] = useState([]);
    const [variant, setVariant] = useState([]);
    const [savedData, setSavedData] = useState([]);
    const [salesPersons, setSalesPersons] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('ft');
    const [quotation, setQuotation] = useState(false);
    const [pdfDesign, setPdfDesign] = useState(false)
    const [currentData, setCurrentData] = useState({
        brand: 'Veka', product: 'Door', type: '', variant: '', mesh: 'No', frame: '',
        lock: '', width: '', height: '', feet: '', area: '', price: '', quantity: '1',
        totalqtyprice: '', glass: '', thickness: '', color: '', adcost: '0', totalcost: '', 
        image: '', floor: ''  // Add this new field
    })
    const [customer, setCustomer] = useState({
        salesPerson: '', quotationNo: '', tpcost: '0', cusName: '', cusAddress: '', cusContact: '',
        cusState: '', date: '', netTotal: '', cgst: '', sgst: '', igst: '', gTotal: ''
    })

    useEffect(() => {

        const fetchType = async () => {

            try { let response;

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

        const fetchSalesman = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/salesManDetails`);
                if (response.status === 200) {
                    if (response.data && response.data.length > 0) { setSalesPersons(response.data) }
                    else { console.log("No salespersons found"); setSalesPersons([]) }
                }
                else { console.log(`Error: Received status code ${response.status}`) }
            }
            catch (err) { console.log("Error Fetching Sales Persons:", err) }
        }

        const quatationNo = async () => {
            try {
                const QResponse= await axios.get(`${apiUrl}/api/quotationNo`);
                if(QResponse.data){
                    let Split_no = QResponse.data.match(/(\D+)(\d+)/)
                    let increament=Number(Split_no[2])+1;
                    let New_Q=Split_no[1]+increament.toString();
                    setCustomer((prevCustomer) => ({ ...prevCustomer,  quotationNo: New_Q }))
                }
            } 
            catch (err) { console.log("Not Applicable"); }
        }

        fetchSalesman();

        quatationNo();

    }, [apiUrl, currentData.product])

    // useEffect(() => { console.log(currentData) }, [currentData]);

    // useEffect(() => { console.log(customer) }, [customer]);

    const handleChange = (event) => { setSelectedStatus(event.target.value) }

    const handleInputChange = async (name, value) => {

        let lockValue = currentData.lock;
        const numericValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value)

        const isProductRelatedChange = name === 'type' || name === 'product' || name === 'variant';

        if (isProductRelatedChange) {
            setCurrentData((prev) => ({
                ...prev, width: 0, height: 0, totalcost: 0,
                totalqtyprice: 0, price: 0, area: 0, feet: 0,
            }));
        }

        if (name === 'type') {
            if (value === 'Sliding Window' || value === 'Sliding Door') { lockValue = 'Touch Lock' }
            else if (value === 'Open Window' || value === 'Open Door') { lockValue = 'Multipoint Lock' }
            else { lockValue = 'Normal Lock' }
            try {
                const response = await axios.post(`${apiUrl}/api/variantTypes`, {
                    selected_type: value,
                    selected_category: currentData.product,
                })
                setVariant(response.data);
            }
            catch (error) { console.error('Error fetching Variant Types:', error) }
        }

        let updatedWidth = parseFloat(currentData.width) || 0;
        let updatedHeight = parseFloat(currentData.height) || 0;
        let updatedQuantity = parseFloat(currentData.quantity) || 0;
        let updatedadcost = parseFloat(currentData.adcost) || 0;

        if (name === 'width') updatedWidth = numericValue;
        if (name === 'height') updatedHeight = numericValue;
        if (name === 'quantity') updatedQuantity = numericValue;
        if (name === 'adcost') updatedadcost = numericValue;

        let updatedArea = 0;
        let areaInMM = 0;
        let areaInFeet = 0;

        if (selectedStatus === 'mm') {
            areaInMM = updatedWidth * updatedHeight;
            areaInFeet = areaInMM / (304.8 * 304.8);
            updatedArea = areaInMM;
        }
        else if (selectedStatus === 'ft') {
            areaInFeet = updatedWidth * updatedHeight;
            areaInMM = areaInFeet * (304.8 * 304.8);
            updatedArea = areaInFeet;
        }

        setCurrentData((prev) => ({
            ...prev, [name]: value, lock: lockValue, width: updatedWidth,
            height: updatedHeight, area: areaInMM, feet: areaInFeet,
        }))

        if (name === 'width' || name === 'height') {
            if (updatedWidth > 0 && updatedHeight > 0) {
                try {
                    const response = await axios.post(`${apiUrl}/api/pricelist`, {
                        height: updatedHeight,
                        width: updatedWidth,
                        selectedProduct: currentData.product,
                        selectedType: currentData.type,
                        selectedVariant: currentData.variant,
                        brand: currentData.brand,
                    })
                    if (response.data?.data !== undefined) {
                        const fetchedPrice = parseFloat(response.data.data).toFixed(2);
                        const recalculatedTotal = (fetchedPrice * updatedQuantity * updatedArea).toFixed(2);
                        const addCost = (parseFloat(recalculatedTotal) + updatedadcost).toFixed(2);
                        setCurrentData((prev) => ({
                            ...prev, price: fetchedPrice,
                            totalqtyprice: recalculatedTotal, totalcost: addCost,
                            image: response.data.image,
                        }))
                    }
                }
                catch (error) { console.error('Error fetching Price List:', error) }
            }
        }

        if (name === 'price') {
            const updatedPrice = numericValue;
            const recalculatedTotal = (updatedPrice * updatedQuantity * updatedArea).toFixed(2);
            const addCost = (parseFloat(recalculatedTotal) + updatedadcost).toFixed(2);
            setCurrentData((prev) => ({
                ...prev, price: updatedPrice,
                totalqtyprice: recalculatedTotal,
                totalcost: addCost,
                image: currentData.image
            }))
        }

        if (name === 'quantity') {
            const fetchedPrice = parseFloat(currentData.price) || 0;
            const recalculatedTotal = (fetchedPrice * updatedQuantity * updatedArea).toFixed(2);
            const addCost = (parseFloat(recalculatedTotal) + updatedadcost).toFixed(2);
            setCurrentData((prev) => ({
                ...prev,
                totalqtyprice: recalculatedTotal,
                totalcost: addCost,
            }))
        }
        else if (name === 'adcost') {
            const totalqtyprice = parseFloat(currentData.totalqtyprice) || 0;
            const addCost = (totalqtyprice + updatedadcost).toFixed(2);
            setCurrentData((prev) => ({ ...prev, totalcost: addCost }));
        }
        else {
            setCurrentData((prev) => ({ ...prev, [name]: value }));
        }
    }

    const handleSave = () => {
        if (currentData.product === 'Door' || currentData.product === 'Window') {
            if (
                currentData.brand === '' || currentData.product === '' || currentData.type === '' || 
                currentData.variant === '' || currentData.width === '' || currentData.height === '' || 
                currentData.price === '' || currentData.glass === '' || currentData.thickness === '' ||
                currentData.color === ''
            ) {
                alert('Please fill in all required Fields .');
                return; 
            }
        }
        if (currentData.product === 'Louver') {
            if (
                currentData.brand === '' || currentData.product === '' ||
                currentData.variant === '' || currentData.width === '' || currentData.height === '' || 
                currentData.price === '' || currentData.glass === '' || currentData.thickness === '' ||
                currentData.color === ''
            ) {
                alert('Please fill in all required Fields .');
                return; 
            }
        }
        setSavedData((prev) => [...prev, currentData]);
        alert("Data saved successfully");
        setCurrentData((prev) => ({
            ...prev, width: "", height: "", area: "", price: "", glass: "", totalqtyprice: '',
            color: "", adcost: "0", quantity: "1", total: "", image: "", totalcost: ''
        }))
    }

    const handleDeleteRow = (index) => { setSavedData((prev) => prev.filter((_, i) => i !== index)) }

    const handleCustomer = (e) => {
        const { name, value } = e.target;
        setCustomer((prevState) => {
            const updatedCustomer = { ...prevState, [name]: value };
            if (updatedCustomer.cusState === 'Tamil Nadu') {
                const cgst = parseFloat(updatedCustomer.netTotal * 9) / 100;
                const sgst = parseFloat(updatedCustomer.netTotal * 9) / 100;

                const gTotal = parseFloat(updatedCustomer.netTotal) + cgst +sgst+ parseFloat(updatedCustomer.tpcost);
                return { ...updatedCustomer, cgst,sgst, gTotal };
            }
            if (updatedCustomer.cusState === 'Others') {
                const cgst = parseFloat(updatedCustomer.netTotal * 9) / 100;
                const igst = parseFloat(updatedCustomer.netTotal * 9) / 100;
                const gTotal = parseFloat(updatedCustomer.netTotal) + igst + cgst + parseFloat(updatedCustomer.tpcost);
                return { ...updatedCustomer, cgst, igst, gTotal };
            }
            return updatedCustomer;
        })
    }

    useEffect(() => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        const netTotal = savedData.reduce((total, data) => total + parseFloat(data.totalcost || 0), 0);
        setCustomer((prev) => ({
            ...prev, date: formattedDate, netTotal
        }))
    }, [savedData]);

    const handleGetQuotation = () => { 
        if (
            !customer.salesPerson || !customer.cusName || !customer.cusAddress || 
            !customer.cusState || !customer.cusContact
        ) {
            alert('Please fill in all required fields.');
            return; 
        }
        setQuotation(true);
    }

    const handleFinish = async () => {

        const printContent = document.getElementById('printDesignContent');
        const elements = printContent.querySelectorAll('*');
        elements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
                if (computedStyle.color.includes('oklch')) {
                element.style.color = '#000000';
            }
            if (computedStyle.backgroundColor.includes('oklch')) {
                element.style.backgroundColor = '#1E88E5';
            }
            if (computedStyle.borderColor.includes('oklch')) {
                element.style.borderColor = '#000000'; 
            }
        })

        const images = printContent.querySelectorAll('img');
        const imagePromises = Array.from(images).map((image) => {
            return new Promise((resolve, reject) => {
                if (image.complete) { resolve() } 
                else {
                    image.onload = resolve;
                    image.onerror = () => {
                        console.error(`Failed to load image: ${image.src}`);
                        resolve(); 
                    }
                    image.crossOrigin = 'anonymous'; 
                }
            })
        })
    
        try {
            await Promise.all(imagePromises);
            const options = {
                margin: 0.1,
                padding: 0.2,
                filename: 'Quotation.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 3,
                    useCORS: true,
                    logging: true,
                    letterRendering: true,
                    backgroundColor: null, 
                },
                jsPDF: {
                    unit: 'in',
                    format: 'letter',
                    orientation: 'portrait',
                    compress: true,
                },
                pagebreak: { mode: ['css', 'legacy'] }
            }
    
            await html2pdf().from(printContent).set(options).save();
            const data = { customer, savedData };
            const response = await axios.post(`${apiUrl}/api/quotationSave`, { data });
            if (response.status === 200) { 
                alert("The Quotation has been Saved Successfully...");
                window.location.reload();
            

             } 
            else { console.error('Failed to send Data to Backend:', response.status) }
        } 
        catch (error) { console.error('Error during PDF generation or data save:', error) }
    }

    return (
        <div className='flex flex-col gap-7 p-3'>
            <span className="text-2xl font-semibold text-white bg-slate-500 py-3 px-5">MEASUREMENTS</span>
            <Product
                currentData={currentData} handleInputChange={handleInputChange} type={type}
                variant={variant} selectedStatus={selectedStatus} handleChange={handleChange}
            />
            <div className="flex justify-end">
                <button
                    className="bg-green-600 w-32 font-bold text-lg text-white py-2.5 px-6 rounded-lg shadow hover:bg-green-700 transition duration-200"
                    onClick={handleSave}
                >
                    <FontAwesomeIcon icon={faSave} className="text-md mr-2" />
                    SAVE
                </button>
            </div>  
            {savedData.length > 0 && (
                <div className='flex flex-col gap-8'>
                    <h2 className="text-2xl font-semibold text-white bg-slate-500 py-3 px-5">ORDER SUMMARY</h2>
                    <Summary savedData={savedData} handleDeleteRow={handleDeleteRow} setSavedData={setSavedData} />
                    <h2 className="text-2xl font-semibold text-white bg-slate-500 py-3 px-5">CUSTOMER DETAILS</h2>
                    <Customer customer={customer} handleCustomer={handleCustomer} salesPersons={salesPersons} savedData={savedData} />
                    <div className=' flex justify-end'>
                        <button
                            className="bg-orange-500 font-bold text-lg text-white py-2.5 px-6 rounded-lg shadow hover:bg-orange-600 transition duration-200"
                            onClick={handleGetQuotation}
                        >
                            Get Quotation
                        </button>
                    </div>
                    <Quotation quotation={quotation} customer={customer} savedData={savedData} pdfDesign={pdfDesign} handleFinish={handleFinish} />
                    {quotation && (
                        <div className='flex justify-end'>
                            <button
                                className="bg-green-600 font-bold text-lg text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                                onClick={handleFinish}
                            >
                                Download Quotation
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Main