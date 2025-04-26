import React from 'react'

function Product(props) 
{
    return (
        <div className='flex flex-col border-2 border-black rounded-lg bg-blue-300'>
            <div className="grid grid-cols-5 gap-7 gap-y-10 p-7 border-b-2 border-black py-12">
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Brand : </label>
                    <select
                        className="w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={props.currentData.brand || ''}
                        onChange={(e) => props.handleInputChange('brand', e.target.value)}
                    >
                        <option value='Veka' className='p-2 text-md'>VEKA</option>
                        <option value='Eiti' className='p-2 text-md'>EITI</option>
                    </select>
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Product : </label>
                    <select
                        className="w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={props.currentData.product || ''}
                        onChange={(e) => props.handleInputChange('product', e.target.value)}
                    >
                        <option className='p-2 text-md'>Door</option>
                        <option className='p-2 text-md'>Window</option>
                        <option className='p-2 text-md'>Louver</option>
                    </select>
                </div>
                {(props.currentData.product === 'Door' || props.currentData.product === 'Window') && (
                    <div className="flex flex-col gap-4">
                        <label className="font-semibold ml-1 uppercase">Type : </label>
                        <select
                            className="w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={props.currentData.type || ''}
                            onChange={(e) => props.handleInputChange('type', e.target.value)}
                        >
                            <option className='p-2 text-md'>Select</option>
                            {props.type.map((typeItem, index) => (
                                <option key={index}>{typeItem}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Variant : </label>
                    <select
                        className="w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={props.currentData.variant || ''}
                        onChange={(e) => props.handleInputChange('variant', e.target.value)}
                    >
                        <option className='p-2 text-md'>Select</option>
                        {props.variant.map((variantItem, index) => (
                            <option key={index}>{variantItem}</option>
                        ))}
                    </select>
                        
                </div>
                {(props.currentData.product === 'Window' || props.currentData.product === 'Louver') && (
                    <>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Mesh : </label>
                            <select
                                className="w-full bg-white p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                name="mesh"
                                value={props.currentData.mesh || ''}
                                onChange={(e) => props.handleInputChange('mesh', e.target.value)}
                            >
                                <option value='No' className='p-2 text-md'>No</option>
                                <option value='Yes' className='p-2 text-md'>Yes</option>
                            </select>
                        </div>
                    </>
                )}
                {props.currentData.brand === 'Veka' && (props.currentData.type === 'Sliding Window' || props.currentData.type === 'Open Window') && (
                    <div className="flex flex-col gap-4">
                        <label className="font-semibold ml-1 uppercase">Frame Series : </label>
                        <select
                            className="w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={props.currentData.frame || ''}
                            onChange={(e) => props.handleInputChange('frame', e.target.value)}
                        >
                            <option className="p-2 text-md" value="">
                                Select
                            </option>
                            {props.currentData.type === 'Sliding Window' && (
                                <>
                                    <option className="p-2 text-md" value="I50">I50</option>
                                    <option className="p-2 text-md" value="I60">I60</option>
                                    <option className="p-2 text-md" value="I64">I64</option>
                                    <option className="p-2 text-md" value="I64">I75</option>
                                </>
                            )}
                            {props.currentData.type === 'Open Window' && (
                                <>
                                    <option className="p-2 text-md" value="I50">I39</option>
                                    <option className="p-2 text-md" value="I50">I44</option>
                                    <option className="p-2 text-md" value="I60">I60</option>
                                </>
                            )}
                        </select>
                    </div>
                )}
                {(props.currentData.type === 'Sliding Window' || props.currentData.type === 'Open Window' || props.currentData.type === 'Sliding Door' || props.currentData.type === 'Open Door') && (
                    <div className="flex flex-col gap-4">
                        <label className="font-semibold ml-1 uppercase">Lock Type : </label>
                        <input
                            className="w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={props.currentData.lock || ''}
                            readOnly
                        />
                    </div>
                )}
            </div>
            <div className="grid grid-cols-5 gap-6 gap-y-10 px-7 py-10 rounded-lg">
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Width : </label>
                    <input
                        className="w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={props.currentData.width || ''}
                        onChange={(e) => props.handleInputChange('width', e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Height : </label>
                    <input
                        className="w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={props.currentData.height || ''}
                        onChange={(e) => props.handleInputChange('height', e.target.value)}
                    />
                </div>
                <div className="flex justify-center items-center gap-4 h-12 mt-10">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="mm"
                            className="w-8 h-8"
                            value="mm"
                            checked={props.selectedStatus === "mm"}
                            onChange={props.handleChange}
                        />
                        <span className="text-xl">mm</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="ft"
                            className="w-8 h-8"
                            value="ft"
                            checked={props.selectedStatus === "ft"}
                            onChange={props.handleChange}
                        />
                        <span className="text-xl">ft</span>
                    </label>
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Sq Ft : </label>
                    <input
                        className="w-full p-3 border-2 border-black rounded-md bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        name="area"
                        value={props.currentData.feet || ''}
                        readOnly
                        disabled
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Area : </label>
                    <input
                        className="w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        name="price"
                        value={props.currentData.area || ''}
                        readOnly
                        disabled
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Price:</label>
                    <input
                        className="w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={props.currentData.price || ''}
                        onChange={(e) => props.handleInputChange('price', e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Quantity:</label>
                    <input
                        className="w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={props.currentData.quantity || ''}
                        onChange={(e) => props.handleInputChange('quantity', e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Total Price:</label>
                    <input
                        className="w-full p-3 border-2 border-black rounded-md bg-slate-200"
                        value={props.currentData.totalqtyprice || ''}
                        readOnly
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Glass : </label>
                    <select
                        className="w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={props.currentData.glass || ''}
                        onChange={(e) => props.handleInputChange('glass', e.target.value)}
                    >
                        <option className='p-2 text-md'>Select</option>
                        <option className='p-2 text-md'>Normal Glass</option>
                        <option className='p-2 text-md'>Toughened Glass</option>
                    </select>
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Glass Thickness : </label>
                    <input
                        className="w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={props.currentData.thickness || ''}
                        onChange={(e) => props.handleInputChange('thickness', e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">COLOUR : </label>
                    <select
                        className="w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={props.currentData.color || ''}
                        onChange={(e) => props.handleInputChange('color', e.target.value)}
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
                <div className="flex flex-col gap-4">
    <label className="font-semibold ml-1 uppercase">Floor : </label>
    <input
        type="text"
        className="w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={props.currentData.floor || ''}
        onChange={(e) => props.handleInputChange('floor', e.target.value)}
        placeholder="Floor number (optional)"
    />
</div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase">Addl Cost : </label>
                    <input
                        className="w-full p-3 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={props.currentData.adcost || ''}
                        onChange={(e) => props.handleInputChange('adcost', e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <label className="font-semibold ml-1 uppercase ">Total Cost : </label>
                    <input
                        className="w-full p-3 border-2 bg-slate-200 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={props.currentData.totalcost || ''}
                        readOnly
                    />
                </div>
            </div>
        </div>
    )
}

export default Product