import React, { useReducer } from 'react'

function Edit(props) {
    // console.log(props.data)
    const initial = props.data;
    const handleChangeData = (changeData, action) => {
        switch (action.work) {
            case "changeData":
                return { ...changeData, [action.field]: action.value }
            default:
                return initial
        }

    }
    const handleSave = () => {
        props.updateData(changeData); 
        props.edit(false);
    };
    


    const [changeData, DisChangeData] = useReducer(handleChangeData, initial);



    return (
        <div className="fixed inset-0  flex justify-center items-center z-50">
            <div className="bg-white w-1/2 grid-cols-2  p-6 rounded-lg shadow-lg relative">
                <button
                    onClick={() => props.edit(false)}
                    className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4">Edit Details</h2>
                <form>
                    {Object.entries(props.data).map(([key, value]) => (
                        <div key={key} className="mb-4">
                            <label className="block font-medium mb-2">{key}</label>
                            <input
                                type="text"
                                name={key}
                                defaultValue={value}
                                disabled={key === "product" || key === "type" || key === "brand"}
                                onChange={(e) => DisChangeData({ field: key, value: e.target.value, work: "changeData" })}
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${key === "product" || key === "type" || key === "width" || key === "height" || key === "brand" ? "bg-gray-300 cursor-not-allowed" : "focus:ring-blue-500"}`} />
                        </div>
                    ))}
                </form>
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={handleSave}
                        
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={() => props.edit(false)}
                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 shadow-md"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Edit