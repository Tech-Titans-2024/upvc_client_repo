import React, { useReducer } from "react";

function handleChangeData(changeData, action) 
{
    switch (action.work) {
        case "changeData":
            return { ...changeData, [action.field]: action.value };
        default:
            return changeData;
    }
}

function Edit(props) 
{
    const initial = props.data;
    const [changeData, DisChangeData] = useReducer(handleChangeData, initial);
    const handleSave = (e) => {
        e.preventDefault();
        props.updateData(changeData);
        props.edit(false);
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => props.edit(false)}
        >
            <div
                className="bg-white w-[550px] p-6 rounded-lg shadow-lg relative"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-6 text-center">EDIT PRICE DETAILS</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    {Object.entries(props.data).map(([key, value], index) => (
                        index % 2 === 0 ? (
                            <div key={key} className="flex gap-8 mb-4">
                                <div className="w-1/2">
                                    <label htmlFor={key} className="block font-medium text-lg mb-2">
                                        {key.charAt(0).toUpperCase() + key.slice(1) + " :"}
                                    </label>
                                    <input
                                        id={key}
                                        type="text"
                                        name={key}
                                        value={changeData[key] || ""}
                                        disabled={["product", "type", "brand", "width", "height"].includes(key)}
                                        onChange={(e) => DisChangeData({ field: key, value: e.target.value, work: "changeData" })}
                                        className={`w-full p-3 border rounded-lg focus:outline-none ${["product", "type", "brand", "width", "height"].includes(key)
                                            ? "bg-gray-200 cursor-not-allowed"
                                            : "focus:ring-2 focus:ring-blue-500"
                                            }`}
                                    />
                                </div>
                                {Object.keys(props.data)[index + 1] && (
                                    <div className="w-1/2">
                                        <label htmlFor={Object.keys(props.data)[index + 1]} className="block font-medium text-lg mb-2">
                                            {Object.keys(props.data)[index + 1].charAt(0).toUpperCase() + Object.keys(props.data)[index + 1].slice(1) + " :"}
                                        </label>
                                        <input
                                            id={Object.keys(props.data)[index + 1]}
                                            type="text"
                                            name={Object.keys(props.data)[index + 1]}
                                            value={changeData[Object.keys(props.data)[index + 1]] || ""}
                                            disabled={["product", "type", "brand", "width", "height"].includes(Object.keys(props.data)[index + 1])}
                                            onChange={(e) => DisChangeData({ field: Object.keys(props.data)[index + 1], value: e.target.value, work: "changeData" })}
                                            className={`w-full p-3 border rounded-lg focus:outline-none ${["product", "type", "brand", "width", "height"].includes(Object.keys(props.data)[index + 1])
                                                ? "bg-gray-200 cursor-not-allowed"
                                                : "focus:ring-2 focus:ring-blue-500"
                                                }`}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : null
                    ))}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="px-5 py-2 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 shadow-md"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => props.edit(false)}
                            className="px-5 py-2 bg-gray-200 rounded-lg text-lg hover:bg-gray-300 shadow-md"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit;