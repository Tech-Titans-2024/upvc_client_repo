import React from "react";

const Profile = () => 
{
    return (
        <div className="h-[100%] px-10">
            <div className="mx-auto">
                <h1 className="text-gray-800 text-4xl font-extrabold text-center mt-2 mb-7">
                    Champion Profile
                </h1>
            </div>
            <iframe
                src="/Profile.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=100&bgcolor=ffffff"
                className="w-full min-h-[83vh] border border-gray-300 shadow-md"
                title="Champion Profile PDF"
            />
        </div>
    )
}

export default Profile;