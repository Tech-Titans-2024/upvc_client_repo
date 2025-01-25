import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logo.jpeg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() 
{
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {

        if (!userName || !password) { setError("Please enter both Username and Password."); return }

        try {
            const response = await axios.post(`${apiUrl}/api/login`, {
                username: userName,
                password: password
            })
            if (response.data.success) { navigate(`upvc/${userName}/`) }
            else { setError(response.data.message) || 'Login Failed' }
        }
        catch (err) {
            setError("An error occurred during Login. Please try again.");
            console.error(err);
        }
    }

    return (
        <div className="w-screen h-screen flex">
            <div className="hidden md:flex w-1/2 bg-gradient-to-b from-blue-600 to-blue-800 justify-center items-center">
                <img
                    src={Logo}
                    alt="LOGO"
                    className="w-[430px] h-[330px] shadow-2xl shadow-black"
                />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white">
                <div className="w-[500px] p-8">
                    <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center" style={{ fontFamily: 'Cambria' }}>
                        LOGIN TO YOUR ACCOUNT
                    </h1>
                    <p className="text-sm text-gray-500 mb-8 text-center">
                        Enter your Credentials to Access the Platform.
                    </p>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <input
                        className="w-full h-[50px] px-4 mb-10 text-lg border border-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700"
                        type="text"
                        placeholder="Enter Username"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        className="w-full h-[50px] px-4 mb-10 text-lg border border-gray-900 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-700"
                        type="password"
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="flex justify-end mb-10">
                        <span className="text-sm text-blue-800 cursor-pointer hover:underline">
                            Forgot Password?
                        </span>
                    </div>
                    <button
                        className="w-full h-[50px] bg-blue-700 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                        onClick={handleLogin}
                    >
                        <FontAwesomeIcon icon={faLock} className="mr-2" />
                        <span className='text-xl mt-0.5' style={{ fontFamily: 'Cambria' }}>LOGIN</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;